import utils from './utils';
import Vue from 'vue';
const postData = utils.postData;
const deleteData = utils.deleteData;

export default class DS{

    private static context: any;

    static setup(context: any){
        this.context = context;
    }

    static deleteProduct(product_id: any){
        return new Promise((resolve, reject) => {
            deleteData(`product/${product_id}`).then((res: any) => {
                this.removeLocalProduct(product_id);
                resolve(true);
            }).catch(error => {
                reject(error);
            });
        });
    }

    static editProduct(data: any){
        this.prepareProductData(data);
        return new Promise((resolve, reject) => {
            postData('product', data).then((res: any) => {
                this.updateLocalProduct(data, res.data);
                resolve(true);
            }).catch(error => {
                reject(error);
            });
        });
    }

    static updateLocalProduct(data: any, rdata: any){
        if(data.id == 'new'){
            rdata.price = utils.mapPrice(rdata.price);
            this.context.dispatch('addProduct', rdata);
        }else{
            const p = this.context.state.productsByIds[data.id];
            p.name = data.name;
            p.product_type = data.product_type;
            p.price = utils.mapPrice(data.price);
        }
    }

    static removeLocalProduct(product_id: any){
        const p = this.context.state.productsByIds[product_id];
        const cat_id = p.category_id + '';
        const cat: any[] = this.context.state.products[cat_id];
        const index = cat.indexOf(p);
        cat.splice(index, 1);
    }

    // --------------------------------

    static prepareProductData(data: any){
        if(parseInt(data.product_type) == 2){
            data.price = 0;
        }else{
            data.price = utils.preparePrice(data.price);
        }
    }

}
