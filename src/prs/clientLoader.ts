import axios from 'axios';
import _url from './api';

export default class ClientLoader{

    private static context: any;

    static setup(context: any){
        this.context = context;
    }

    static loadClient(phone: string){
        return new Promise((resolve, reject) => {
            axios.get(_url('client/' + phone)).then(({data}) => {
                if(data.status == 'OK'){
                    this.context.dispatch('setClientData', data.clientData);
                    this.context.dispatch('setAreaAView', 'history');
                    resolve(true);
                }else{
                    reject(data.cause);
                }
            }).catch(error => reject(error));
        });
    }

}