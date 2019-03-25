<template>
    <Modal v-model="open" :title="title" :dialog="dialogData" :loading="loading">

        <h2>Client information</h2>
        <ClientInfoForm :data="clientData" />
        <hr>
        <BarcodeInput v-model="barcode" />
        <hr>
        <AmountPriceForm :value="amounts" />
        <template v-slot:buttons>
            <sui-button @click="open = false">Cancel</sui-button>
            <sui-button @click="addClick" color="green">ADD</sui-button>
        </template>

    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ProductsFactory from '@/prs/productsFactory';
import MxHelper from '@/prs/MxHelper';
import Modal from '../Elts/Modal.vue';
import BarcodeInput from './BarcodeInput.vue';
import ClientInfoForm from './ClientInfoForm.vue';
import AmountPriceForm from './AmountPriceForm.vue';

@Component({
    components: {
        Modal,
        BarcodeInput,
        ClientInfoForm,
        AmountPriceForm
    }
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
            this.add();
            this.open = false;
        }
    }

    add(){
        ProductsFactory.addPrepaidItem(this.barcode, this.clientData, this.amounts, this.isReload);
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
        if(this.clientData.phone.length < 8 || this.clientData.first_name.length < 2){
            this.dialogData.text = 'Please enter valid Phone Number and First Name';
            this.dialogData.open = true;
        }else if(this.barcode.length < 6){
            this.dialogData.text = 'Please enter a valid Barcode.';
            this.dialogData.open = true;
        }else if(!price || !amount || isNaN(price) || isNaN(amount)){
            this.dialogData.text = 'Please enter a valid Price and Amount to load.';
            this.dialogData.open = true;
        }else{
            return true;
        }
        return false;
    }

    resetForm(){
        this.loading = false;
        this.barcode = '';
        this.clientData = {
            phone: '',
            email: '',
            first_name: '',
            last_name: ''
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

