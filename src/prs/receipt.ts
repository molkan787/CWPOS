import POSReceiptBuilder from '../Libs/POSReceiptBuilder';
import Printer from '../drivers/printer';
import utils from '../utils';
import utils2 from './utils';
import things from '../prs/things';
import consts from './consts';

export default class Receipt{

    static prb: POSReceiptBuilder;

    static state: any;

    static setup(context: any){
        this.state = context.state;
        this.prb = new POSReceiptBuilder();
    }

    static print(order: any){
        const r = this.prb;
        r.clear();
        r.addHeader({
            title: 'AVANTI AUTOSPA',
            subtitles: [
                "LAVE AUTO A LA MAIN ET CENTRE",
                "ESTHETIQUE PROFESSIONNELLE",
                "3540 boul. des Sources, DDO QC  H9B 1Z9",
                "514-472-9947",
            ],
            orderId: order.id,
            date: utils.timestampToDate(order.date_added, 2, true),
            cashier: order.cashier.first_name + ' ' + order.cashier.last_name,
            client: order.client.id ? (order.client.first_name + ' ' + order.client.last_name) : 'WALKIN'
        }, true);
        
        const items = order.products;
        const counts = order.counts;
        for(let i = 0; i < items.length; i++){
            const p = items[i];
            const c = counts[p.id];
            if(!c) continue;
            r.addItem({
                name: p.name + ' ' + this._getLabel(p),
                price: this._getPriceWithoutTaxes(p, order.taxes),
                q: counts[p.id],
            });
        }
        if(order.totals.extraCharge){
            r.addItem({
                name: 'Extra charge',
                price: this._removeTaxes(order.totals.extraCharge, order.taxes),
                q: 0,
            });
        }

        if(order.totals.discount){
            r.addTotalsItem({
                name: 'Discount',
                amount: this._removeTaxes(order.totals.discount, order.taxes),
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

        const paym = order.pay_method;
        if(paym == 'cash'){
            r.addTotalsItem({ name: 'Comptant', amount: order.totals.paidCash });
            r.addTotalsItem({ name: 'Monnaie', amount: order.totals.changeDue });
        }else if(paym == 'card'){
            r.addTotalsItem({ name: 'Comptant', text: 'Credit ou Debit' });
        }else if(paym == 'prepaid'){
            r.addTotalsItem({ name: 'Comptant', text: 'CARTE PREPAYEE-' + order.payment.barcode.substr(-5) });
        }else if(paym == 'loyalty'){
            r.addTotalsItem({ name: 'Comptant', text: 'CARTE FIDELITE-' + order.payment.barcode.substr(-5) });
        }

        r.addSpace();

        if(order.loyaltyCard.id){
            const card = order.loyaltyCard;
            const bal_str = utils2.price(card.balance / 100);
            r.addNormalMessage(`Client Fidele vous avez ${bal_str}`);
            r.addNormalMessage(`en dollars fidelite`);
        }

        if(order.prepaidCard.id){
            const card = order.prepaidCard;
            const bal_str = utils2.price(card.balance / 100);
            r.addNormalMessage('Le solde de votre carte prepayee est ' + bal_str);
        }

        const msg = this.state.receipt_msg.replace(/\s/g, '');
        if(msg){
            r.addSeparator();
            const lines = this.state.receipt_msg.split("\n");
            for(let line of lines){
                if(line[0] == '*'){
                    r.addBigMessage(line.substring(1));
                }else{
                    r.addNormalMessage(line);
                }
            }
        }

        r.addSeparator();
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

    static _getPriceWithoutTaxes(p: any, taxes: any){
        if(p.product_type == consts.productWithoutTaxesType || p.addTaxes){
            return p.price;
        }else{
            return this._removeTaxes(p.price, taxes);
        }
    }

    static _removeTaxes(value: any, taxes: any){
        const totalTaxRate = taxes.gst + taxes.qst;
        return value / (totalTaxRate + 1);
    }

}