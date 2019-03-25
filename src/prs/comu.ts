import axios from 'axios';
import consts from './consts';
import Products from './dcr/products';
import ProductsFactory from './productsFactory';
import PredefinedOrder from './predefinedOrder';

const ApiBaseURI = 'http://localhost:8081/';
function _url(path:string){
  return ApiBaseURI + path;
}

export default class Comu{

    private static context: any;
    private static objectsToReset: any[];

    static setup(context: any){
        this.context = context;
        this.objectsToReset = [];
        ProductsFactory.setup(context);
        PredefinedOrder.setup(context);
        this.loadData();
    }

    static activatePrepaidCard(barcode: string, clientData: any, balance: number){
        return new Promise((resolve, reject) => {
            const data = {
                barcode,
                clientData,
                balance,
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
  
        });
    }

    static reset(){
        this.context.dispatch('resetPOS');
        this.resetObjects();
    }

    static startSubmission(){
        this.context.state.postingOrder = true;
    }

    static printReceipt(){
        console.log('Printing receipt');
    }

    static postOrder(){
        return new Promise((resolve, reject) => {
            const state = this.context.state;
            const items = state.pos.items;
            const itemsCount = state.pos.itemsCount;
            const orderData = {
                user_id: state.user.id,
                client_id: state.client.id,
                total: state.pos.values.total,
                totals: state.pos.values,
                items: {
                    products: state.pos.items,
                    counts: state.pos.itemsCount
                },
                pay_method: state.pos.pay_method,
                receipt: 0
            };
            const stats = {
                cw: 0,
                pp: 0,
                rpp: 0,
                dt: 0,
            };
            for(let i = 0; i < items.length; i++){
                const item = items[i];
                if(item.product_type == 1){
                    stats.cw += itemsCount[item.id];
                }
            }
            const data = {
                orderData,
                stats,
            }
            axios.post(_url('order'), data).then(() => {

                state.stats.cw += stats.cw;
                state.stats.pp += stats.pp;
                state.stats.rpp += stats.rpp;
                state.stats.dt += stats.dt;
                resolve(true);
            }).catch(error => {
                reject(error);
            });
        });
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
}