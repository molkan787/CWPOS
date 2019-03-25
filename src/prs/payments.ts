import axios from 'axios';
import comu from './comu';
import _url from './api';
import MxHelper from './MxHelper';
import Utils from './utils';

export default class{
    
    static requestPayment(method: string, payload: any){
        if(!comu.canRequestPayment()) return;

        if(method == 'prepaid' || method == 'prepaid'){
            // @ts-ignore
            MxHelper.payment({state: 'posting'});
        }
        if(typeof payload == 'object'){
            payload.amount = comu.getOrderTotal();
        }
        let paymentHandler;
        switch (method) {
            case 'cash':
                paymentHandler = this._Cash(payload);
                break;
            case 'card':
                paymentHandler = this._DebitCard(payload);
                break;
            case 'prepaid':
                paymentHandler = this._PrepaidCard(payload);
                break;
            case 'loyalty':
                paymentHandler = this._LoyaltyCard(payload);
                break;
            case 'invoice_ari':
                paymentHandler = this._Invoice(payload);
                break;
            default:
                paymentHandler = this._Other(payload);
                break;
        }
        paymentHandler.then(() => {
            comu.markAsPaid();
        }).catch(error => {
            // @ts-ignore
            MxHelper.payment({state: 'fail', error});
        });
    }

    private static _Cash(payload: any){
        return new Promise((resolve, reject) => {
            // Open cash drawer...
            resolve(true);
        });
    }

    private static _DebitCard(payload: any){
        return new Promise((resolve, reject) => {
            // Send amount to Credit/Debit Card Machine
            // And wait for success reponse then resolve(true);
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    private static _PrepaidCard(payload: any){
        return new Promise((resolve, reject) => {
            // Send request to server
            axios.post(_url('capture/prepaid'), payload).then(({data}) => {
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

    private static _LoyaltyCard(payload: any){
        return new Promise((resolve, reject) => {
            // Send request to server
            axios.post(_url('capture/loyalty'), payload).then(({data}) => {
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

    private static _Invoice(payload: any){
        return new Promise((resolve, reject) => {
            // Add amount to invoicing system for specific company/client
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    private static _Other(payload: any){
        return new Promise((resolve, reject) => {
            // Imidiatly approve the payment
            resolve(true);
        });
    }

}