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
            title: 'AVANTI AUTOSPA',
            subtitles: [
                "LAVE AUTO À LA MAIN ET CENTRE\nESTHÉTIQUE PROFESSIONNELLE",
                "3540 boul. des Sources, DDO QC  H9B 1Z9\n514-472-9947"
            ],
            orderId: order.id,
            date: utils.timestampToDate(order.date_added, 2),
            cashier: order.cashier.first_name + ' ' + order.cashier.last_name,
            client: order.client.id ? (order.client.first_name + ' ' + order.client.last_name) : 'WALKIN'
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
            name: 'Sous-total',
            amount: order.totals.subTotal,
        });

        if(order.totals.tips){
            r.addTotalsItem({
                name: 'Pourboire (non taxable)',
                amount: order.totals.tips,
            });
        }

        r.addTotalsItem({ name: 'TPS', amount: order.totals.taxGST, leftPadding: true });
        r.addTotalsItem({ name: 'TVQ', amount: order.totals.taxQST, leftPadding: true });

        r.addTotalsItem({
            name: 'TOTAL',
            amount: order.totals.total,
        });

        r.addNormalMessage('Client Fidele vous avez $ 4.00 en dollars fidélite', true);
        r.addNormalMessage('Le solde de votre carte prépayée est $ 176');

        r.addSeparator();
        r.addBigMessage('Spring Special save $ 25 on a hand wax');
        r.addNormalMessage('Please present this receipt.\nExpires:   30-05-2019\nAVANTI AUTOSPA');
        r.addSeparator(1);

        r.addBigMessage('MERCI POUR VOTRE VISITE', true);
        r.addNormalMessage('TPS: 762219293  TVQ:  1223960291', true);
        r.addSpace();

        Printer.print(r.getLines());
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