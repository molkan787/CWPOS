import POSReceiptBuilder from '../Libs/POSReceiptBuilder';
import Printer from '../drivers/printer';
import utils from '../utils';
import things from '../prs/things';

export default class Receipt{

    static prb: POSReceiptBuilder;

    static setup(){
        this.prb = new POSReceiptBuilder();
    }

    static print(order: any){
        const r = this.prb;
        r.clear();
        r.addHeader({
            title: '( AvantAutoSpa )',
            orderId: order.id,
            date: utils.timestampToDate(order.date_added, true),
            cashier: order.cashier.first_name + ' ' + order.cashier.last_name,
        });
        
        const items = order.products;
        const counts = order.counts;
        for(let i = 0; i < items.length; i++){
            const p = items[i];
            const c = counts[p.id];
            if(!c) continue;
            r.addItem({
                name: p.name + ' ' + this._getLabel(p),
                price: p.price + (p.taxes || 0),
                q: counts[p.id],
            });
        }
        if(order.totals.extraCharge){
            r.addItem({
                name: 'Extra charge',
                price: order.totals.extraCharge,
                q: 0,
            });
        }

        r.addTotalsItem({
            name: 'Sub-Total',
            amount: order.totals.itemsTotal - order.totals.tips,
        });
        r.addTotalsItem({
            name: 'Discount',
            amount: order.totals.discount,
        });

        if(order.totals.tips){
            r.addTotalsItem({
                name: 'Tips',
                amount: order.totals.tips,
            });
        }

        r.addTotalsItem({
            name: 'TOTAL',
            amount: order.totals.total,
            isFinal: true,
        });

        const raw = r.getString();
        // console.log(raw);
        Printer.print(raw);
    }

    static _getLabel(p: any){
        // @ts-ignore
        const label = things.prefix[p.category_id] || p.label;
        if(label){
            return `(${label})`;
        }else{
            return '';
        }

    }

}