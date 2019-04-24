import utils from './utils';
import consts from './consts';

export default class ProductsFactory{

    private static context: any;

    static setup(context: any){
        this.context = context;
    }

    static addPrepaidItem(barcode: string, clientData: any, amounts: any, isReload: boolean){
        const data = {
            id: isReload ? consts.reloadPrepaidCardItemId : consts.newPrepaidCardItemId,
            name: isReload ? consts.reloadPrepaidCardItemName : consts.newPrepaidCardItemName,
            product_type: consts.productWithTaxesType,
            price: utils.roundPrice(amounts.price),
            label: utils.price(amounts.amount),
            barcode,
            clientData,
            amount: utils.roundPrice(amounts.amount)
        }
        this.context.dispatch('addCustomItem', data);
    }

}