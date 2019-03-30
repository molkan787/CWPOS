import axios from 'axios';
import _url from './api';
import Products from './dcr/products';
import Clients from './dcr/clients';
import ProductsFactory from './productsFactory';
import PredefinedOrder from './predefinedOrder';
import MxHelper from './MxHelper';
import Dl from './dl';
import Ds from './ds';
import ClientLoader from './clientLoader';
import consts from './consts';
import Utils from './utils';
import extUtils from '@/utils';

export default class Comu{

    private static context: any;
    private static objectsToReset: any[];
    private static interval: Number;

    static setup(context: any){
        this.context = context;
        this.objectsToReset = [];
        ProductsFactory.setup(context);
        PredefinedOrder.setup(context);
        ClientLoader.setup(context);
        Dl.setup(context);
        Ds.setup(context);
        this.loadData();

        this.updateTime();
        this.interval = setInterval(() => {
            this.updateTime();
        }, 15000);
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
        axios.get(_url('asd')).then(response => {
            this.context.state.categories = response.data.categories;
            this.context.state.products = Products.mapByCategory(response.data.products, true);
            this.context.state.productsByIds = Products.mapById(response.data.products, false);
            this.context.state.productsArray = response.data.products;
            this.context.state.stats = response.data.stats;
            this.context.state.companies = Clients.prepareData(response.data.companies);
        });
    }

    static reset(){
        this.context.dispatch('resetPOS');
        this.resetObjects();
    }

    static canRequestPayment(){
        return (!this.context.state.pos.paid && !this.context.state.pos.finished && this.context.state.postingOrder);
    }

    static getOrderTotal(){
        return Utils.preparePrice(this.context.state.pos.values.total);
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
                    ticket: '',
                },
                pay_method: state.pos.pay_method,
                receipt: 0
            };
            const stats = this.getStats(items, itemsCount);
            const data = {
                orderData,
                stats,
            }
            axios.post(_url('order'), data).then(({data}) => {
                if(data.status == 'OK'){
                    state.stats.cw += stats.cw;
                    state.stats.pp += stats.pp;
                    state.stats.rpp += stats.rpp;
                    state.stats.dt += stats.dt;
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
}