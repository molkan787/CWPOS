import axios from 'axios';
import queryString  from 'query-string';

const PES_URL = 'https://localemv.com:8887';

export default class CardMachine{

    static cancel(){
        this.cancelTransaction();
    }

    static request(payload: any){
        return new Promise(async (resolve, reject) => {
            try {
                payload.callback('READY');
                const amount = (payload.amount / 100).toFixed(2);
                const params = {
                    xInvoice: '1',
                    xCommand: 'cc:sale',
                    xAmount: amount,
                    xStreet: '123 Main St',
                    xZip: '11111',
                };
                
                const response = await axios.post(PES_URL, queryString.stringify(params));
                const data = queryString.parse(response.data);
                console.log('CCP:Response>', response);
                console.log('CCP:Data>', data);

                if(data.xResult == 'A'){
                    resolve(true);
                }else if(data.xResult == 'D'){
                    resolve(false);
                }else{
                    reject(`xResult:${data.xResult}`);
                }
            } catch (error) {
                reject(error);
            }


        });
    }

    private static cancelTransaction(){
        axios.post(PES_URL, queryString.stringify({xCancel: 1}))
        .catch(err => console.log(err));
    }

}