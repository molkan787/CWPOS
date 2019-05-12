import axios from 'axios';
import _url from './api';
import MxHelper from '@/prs/MxHelper';
import Message from '@/ccs/Message';
import Vue from 'vue';

export default class ClientLoader{

    private static context: any;

    static setup(context: any){
        this.context = context;
    }

    static loadClient(phone: string){
        return new Promise((resolve, reject) => {
            axios.get(_url('clcref/phone/' + phone)).then(({data}) => {
                if(data.status == 'OK'){
                    console.log('loadClient:', data);
                    this.setClientData(data.clientData);
                    resolve(true);
                }else{
                    reject(data.cause);
                    if(data.cause == 'NOT_FOUND'){
                        this.addNewClient(phone);
                    }
                }
            }).catch(error => reject(error));
        });
    }
    static loadLoyaltyCard(barcode: string){
        return new Promise((resolve, reject) => {
            axios.get(_url('clcref/loyalty_card/' + barcode)).then(({data}) => {
                if(data.status == 'OK'){
                    console.log('loadLoyaltyCard:', data);
                    this.setLoyaltyCard(data.loyaltyCard);
                    resolve(data.loyaltyCard);
                }else{
                    reject(data.cause);
                }
            }).catch(error => reject(error));
        });
    }

    static setClientData(data: any, doNotCallback?: boolean){
        this.calcReceiptPreference(data);
        this.context.dispatch('setClientData', data);
        this.context.dispatch('setAreaAView', data.id ? 'history' : 'order');
        if(!doNotCallback){
            this.setLoyaltyCard(data.loyalty || {}, true);
        }
    }

    static setLoyaltyCard(data: any, doNotCallback?: boolean){
        const loyaltyCard = this.context.state.loyaltyCard;
        loyaltyCard.id = data.id || 0;
        loyaltyCard.barcode = data.barcode || '';
        loyaltyCard.balance = data.balance || 0;
        if(loyaltyCard.updateCount){
            loyaltyCard.updateCount++;
        }else{
            Vue.set(loyaltyCard, 'updateCount', 1);
        }
        if(!doNotCallback){
            this.setClientData(data.client || {}, true);
            if(!data.client && loyaltyCard.id){
                this.askToAddClient(loyaltyCard.id);
            }
        }
    }

    static calcReceiptPreference(client: any){
        const orders = client.history;
        if(!orders) return;
        let sum = 0;
        for(let i = 0; i < orders.length; i++){
            sum += orders[i].receipt;
        }
        client.want_receipt = Math.round(sum / orders.length);
    }


    static addNewClient(phone: string, loyaltyCardId?: any){
        // @ts-ignore
        MxHelper.editClient({id: 'new', phone, loyaltyCardId}).then((client: any) => {
            this.context.dispatch('setClientData', client);
        })
    }

    static askToAddClient(loyaltyCardId: any){
        Message.ask('This loyalty card is not linked to any of client phone number, Do you want to link a new client now ?', 'Add new client?')
        .then((e: any) => {
            e.hide();
            if(e.answer){
                this.addNewClient('', loyaltyCardId);
            }
        });
    }

}