import config from '@/config';
import axios from 'axios';
import _url from './api';
import Products from './dcr/products';
import Clients from './dcr/clients';
import ProductsFactory from './productsFactory';
import PredefinedOrder from './predefinedOrder';
import MxHelper from './MxHelper';
import Dl from './dl';
import Ds from './ds';
import DM from './dm';
import Login from './login';
import ClientLoader from './clientLoader';
import consts from './consts';
import Utils from './utils';
import extUtils from '@/utils';
import Receipt from './receipt';

export default class Comu{

    private static context: any;
    private static objectsToReset: any[];
    private static interval: Number;
    private static apiToken: string = '';

    static setup(context: any){
        this.context = context;
        this.objectsToReset = [];
        ProductsFactory.setup(context);
        PredefinedOrder.setup(context);
        ClientLoader.setup(context);
        Dl.setup(context);
        Ds.setup(context);
        DM.setup(context, this);
        Receipt.setup(context);
        Login.setup(context, this);

        this.updateTime();
        this.interval = setInterval(() => {
            this.updateTime();
        }, 15000);

        if(config.debug){
            this.loadData();
            Login.setUser({
                token: '',
                user: {
                    username: 'foo',
                    user_type: 1,
                    id: 1,
                }
            })
        }
    }

    static setToken(token: string){
        this.apiToken = token;
        axios.defaults.headers.common['Authorization'] = token;
    }

    static setPaymentDetails(data: any){
        this.context.state.payment = data;
    }

    static activatePrepaidCard(barcode: string, clientData: any, balance: number){
        return new Promise((resolve, reject) => {
            const data = {
                barcode,
                clientData,
                balance: Utils.preparePrice(balance),
            };
            axios.post(_url('prepaid/add'), data).then(({data}) => {
                if(data.status == 'OK'){
                    resolve(true);
                }else{
                    reject(data.cause);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    static reloadPrepaidCard(barcode: string, amount: number){
        return new Promise((resolve, reject) => {
            const data = {
                barcode,
                amount: Utils.preparePrice(amount),
            };
            axios.post(_url('prepaid/reload'), data).then(({data}) => {
                if(data.status == 'OK'){
                    resolve(true);
                }else{
                    reject(data.cause);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    static activateLoyaltyCard(barcode: string, clientData: any){
        return new Promise((resolve, reject) => {
            const data = {
                barcode,
                clientData,
            };
            axios.post(_url('loyalty/add'), data).then(({data}) => {
                if(data.status == 'OK'){
                    resolve(true);
                }else{
                    reject(data.cause);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    static loadData(){
        return new Promise((resolve, reject) => {
            axios.get(_url('asd')).then(response => {
                const data = response.data;
                const state = this.context.state;
                state.categories = data.categories;
                state.products = Products.mapByCategory(data.products, true);
                state.productsByIds = Products.mapById(data.products, false);
                state.productsArray = data.products;
                state.stats = data.stats;
                state.companies = Clients.prepareData(data.companies);
                this.putSettings(data.settings);
                resolve(true);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static reset(){
        this.context.dispatch('resetPOS');
        this.resetObjects();
    }

    static canRequestPayment(){
        return (!this.context.state.pos.paid && !this.context.state.pos.finished && this.context.state.postingOrder);
    }

    static resetStatus(){
        const state = this.context.state;
        state.pos.paid = false;
        state.pos.finished = false;
        state.postingOrder = false;
    }

    static getOrderTotal(){
        return Utils.preparePrice(this.context.state.pos.values.total);
    }

    static getUser(userId: any){
        const users = this.context.state.data.users.filter((user: any) => user.id == userId);
        return users.length ? users[0] : null;
    }

    public static putSettings(settings: any){
        const state = this.context.state;
        state.taxes.gst = settings.gst;
        state.taxes.qst = settings.qst;
    }

    // ==================================

    static startSubmission(){
        this.context.state.postingOrder = true;
        // @ts-ignore
        MxHelper.payment();
    }

    static postOrder(){
        return new Promise((resolve, reject) => {
            const state = this.context.state;
            const {items, itemsCount} = state.pos;
            const orderData = {
                user_id: state.user.id,
                client_id: state.client.id,
                total: Utils.preparePrice(state.pos.values.total),
                totals: state.pos.values,
                items: {
                    products: state.pos.items,
                    counts: state.pos.itemsCount
                },
                other_data: {
                    ticket: state.ticket,
                },
                pay_method: state.pos.pay_method,
                receipt: 0,
            };
            const stats = this.getStats(items, itemsCount);
            const data = {
                orderData,
                stats,
                payment: state.payment,
            }
            axios.post(_url('order'), data).then(({data}) => {
                if(data.status == 'OK'){
                    state.stats.cw += stats.cw;
                    state.stats.pp += stats.pp;
                    state.stats.rpp += stats.rpp;
                    state.stats.dt += stats.dt;
                    state.nextOrderId = data.nextOrderId;
                    resolve(true);
                }else{
                    reject(data.cause);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }

    static markAsPaid(){
        this.context.dispatch('markAsPaid');
        // @ts-ignore
        MxHelper.payment({state: 'posting'});
        this.postOrder().then(() => {
            this.markAsFinished();
            // @ts-ignore
            MxHelper.payment({state: 'success'});
        }).catch(error => {
            this.resetStatus();
            // @ts-ignore
            MxHelper.payment({state: 'fail', error});
        });
    }
    static markAsFinished(){
        this.context.dispatch('markAsFinished');
    }

    // ==================================

    static printReceipt(){
        console.log('Printing receipt');
        axios.post(_url('setReceiptFlag'), {order_id: this.context.state.nextOrderId - 1})
        .catch(() => {});
        Receipt.print();
    }

    static registerToReset(obj: any){
        this.objectsToReset.push(obj);
    }

    static resetObjects(){
        for(let i = 0; i < this.objectsToReset.length; i++){
            const obj = this.objectsToReset[i];
            if(typeof obj.reset != 'undefined'){
                obj.reset();
            }
        }
    }


    // ---------------------------------

    static updateTime(){
        this.context.state.currentTime = extUtils.getCurrentTime();
    }

    // ---------------------------------

    private static getStats(items: any[], itemsCount: any){
        const stats = {
            cw: 0,
            pp: 0,
            rpp: 0,
            dt: 0,
        };
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            if(item.id == consts.newPrepaidCardItemId){
                stats.pp += itemsCount[item.id];
            }else if(item.id == consts.reloadPrepaidCardItemId){
                stats.rpp += itemsCount[item.id];
            }else if(item.category_id == 3){
                stats.dt += itemsCount[item.id];
            }else if(item.product_type == 1){
                stats.cw += itemsCount[item.id];
            }
        }
        return stats;
    }

    public static setExactPaid(){
        // @ts-ignore
        MxHelper.setExactPaid();
    }
}