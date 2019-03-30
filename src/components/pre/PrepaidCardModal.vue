<template>
    <Modal v-model="open" :title="title" :dialog="dialogData" :loading="loading" @dialogAnswer="dialogAnswer">

        <h2 v-if="!isReload">Client information</h2>
        <ClientInfoForm v-if="!isReload" :data="clientData" />
        <hr v-if="!isReload">
        <BarcodeInput v-model="barcode" />
        <hr>
        <AmountPriceForm :value="amounts" />
        <template v-slot:buttons>
            <sui-button @click="open = false">Cancel</sui-button>
            <sui-button @click="addClick" color="green">
                <span v-if="isReload">Reload</span>
                <span v-else>Activate</span>
            </sui-button>
        </template>

    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState } from 'vuex';
import ProductsFactory from '@/prs/productsFactory';
import MxHelper from '@/prs/MxHelper';
import Modal from '../Elts/Modal.vue';
import BarcodeInput from './BarcodeInput.vue';
import ClientInfoForm from './ClientInfoForm.vue';
import AmountPriceForm from './AmountPriceForm.vue';
import Comu from '@/prs/comu';

@Component({
    components: {
        Modal,
        BarcodeInput,
        ClientInfoForm,
        AmountPriceForm
    },
    computed: mapState(['client']),
})
export default class PrepaidCardModal extends Vue{

    private open: boolean = false;
    private loading: boolean = false;
    private dialogData: any = {};

    private title: string = '';

    private isReload: boolean = false;
    private barcode: string = '';
    private clientData: any = {};
    private amounts: any = {};

    addClick(){
        if(this.validateForm()){
            this.loading = true;
            this.activate();
        }
    }

    add(){
        ProductsFactory.addPrepaidItem(this.barcode, this.clientData, this.amounts, this.isReload);
    }

    activate(){
        if(this.isReload){
            Comu.reloadPrepaidCard(this.barcode, this.amounts.amount).then(response => {
                this.add();
                this.dialog('Prepaid Card was successfully reloaded!', 'success');
            }).catch(error => {
                if(error == 'CARD_DOES_NOT_EXIST'){
                    this.dialog('This Prepaid Card are not activated yet.');
                }else{
                    this.dialog('Sorry, We could not complete the current action.');
                }
            });
        }else{
            Comu.activatePrepaidCard(this.barcode, this.clientData, this.amounts.amount).then(response => {
                this.add();
                this.dialog('Prepaid Card was successfully activated!', 'success');
            }).catch(error => {
                if(error == 'CARD_EXIST'){
                    this.dialog('This Prepaid Card is already activated, Please use other card.');
                }else{
                    this.dialog('Sorry, We could not complete the current action.');
                }
            });
        }
    }

    dialogAnswer(answer: string){
        if(answer == 'OK' && this.dialogData.ref == 'success'){
            this.open = false;
        }
    }

    handle(isReload: boolean = false){
        this.title = isReload ? 'Reload Prepaid Card' : 'Activate new Prepaid Card';
        this.isReload = isReload;
        this.resetForm();
        this.open = true;
    }

    validateForm(){
        this.amounts.price = this.amounts.price.replace(' ', '');
        this.amounts.amount = this.amounts.amount.replace(' ', '');
        const {price, amount} = this.amounts;
        if(!this.isReload && (this.clientData.phone.length < 8 || this.clientData.first_name.length < 2)){
            this.dialog('Please enter valid Phone Number and First Name');
        }else if(this.barcode.length < 6){
            this.dialog('Please enter a valid Barcode.');
        }else if(!price || !amount || isNaN(price) || isNaN(amount)){
            this.dialog('Please enter a valid Price and Amount to load.');
        }else{
            return true;
        }
        return false;
    }

    resetForm(){
        this.dialogData.open = false;
        this.loading = false;
        this.barcode = '';
        this.clientData = {
            // @ts-ignore
            ...this.client
        };
        this.amounts = {
            amount: '',
            price: '',
        };
        this.dialogData = {
            open: false,
            type: 1,
            text: ''
        };
    }

    dialog(text: string, ref?: string){
        this.loading = false;
        this.dialogData.text = text;
        this.dialogData.ref = ref;
        this.dialogData.open = true;
    }

    created(){
        // @ts-ignore
        MxHelper.registerFunction('openPrepaidCardModal', this);
    }

}
</script>

<style lang="scss" scoped>
h2{
    margin-top: 0;
}
hr{
    margin: 1.4rem 0 1rem 0;
}
</style>

