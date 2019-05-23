import axios from 'axios';
import queryString  from 'query-string';

const PES_URL = 'http://127.0.0.1:8887';

class CardMachine{

    static dpPtr: number = 0;
    static lastInvoiceId: number = 0;

    static cancel(){
        console.log('Canceling Card Payment...');
        this.cancelTransaction();
    }

    static request(payload: any){
        return new Promise(async (resolve, reject) => {

            if (this.lastInvoiceId == payload.invoiceId){
                this.dpPtr++;
            }else{
                this.dpPtr = 0;
            }
            this.lastInvoiceId = payload.invoiceId
            const invoice = (payload.invoiceId * 100) + this.dpPtr;

            console.log('Requesting card payment for Invoice:' + invoice);
            try {
                payload.callback('READY');
                const amount = (payload.amount / 100).toFixed(2);
                const params = {
                    xInvoice: invoice + '',
                    xCommand: 'cc:sale',
                    xAmount: amount,
                    xStreet: '3540 Boul. des Sources',
                    xZip: 'H9B 1Z9',
                };
                
                const response = await axios.post(PES_URL, queryString.stringify(params));
                const data = response.data;
                console.log('CCP:Response>', response);
                console.log('CCP:Data>', data);

                if(data.xResult == 'A'){
                    resolve(true);
                }else if(data.xResult == 'D'){
                    resolve(false);
                }else{
                    reject(data);
                }
            } catch (error) {
                reject(error);
            }


        });
    }

    private static async cancelTransaction(){
        try {
            await axios.post(PES_URL, queryString.stringify({xCancel: 1}));
        } catch (error) {
            console.log('cancelTransaction:Error', error);
        }
    }

}

export default CardMachine;
// @ts-ignore
window.cardMachine = CardMachine;