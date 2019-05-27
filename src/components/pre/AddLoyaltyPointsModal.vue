<template>
    <Modal v-model="open" title="Add loyalty points" :dialog="dialogData" :loading="loading" @dialogAnswer="dialogAnswer">

        <h2>{{ title }}</h2>
        <hr>
        <Switcher class="type-switcher" v-model="addType" leftText="Regular" rightText="Prepaid"/>
        <h3></h3>
        <LabeledInput label="Amount ($)" v-model="amount" type="number" />

        <template v-slot:buttons>
            <sui-button @click="open = false">CANCEL</sui-button>
            <sui-button @click="saveClick" color="green">SAVE</sui-button>
        </template>

    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import MxHelper from '@/prs/MxHelper';
import DM from '@/prs/dm';
import Modal from '../Elts/Modal.vue';
import LabeledInput from '../Elts/inputs/LabeledInput.vue';
import Switcher from './Switcher.vue';

@Component({
    components: {
        Modal,
        LabeledInput,
        Switcher,
    },
    computed: mapState(['loyaltyCard', 'loyaltyPoints']),
    methods: mapActions(['updateCardBalance']),
})
export default class AddLoyaltyPointsModal extends Vue{

    private open: boolean = false;
    private loading: boolean = false;
    private dialogData: any = {
        text: '',
        ref: '',
        open: false,
    };

    private amount: number = 0;

    private title: string = '';
    private addType: number = 1;

    saveClick(){
        if(this.validateForm()){
            this.loading = true;
            this.save();
        }
    }

    save(){
        const balance = parseFloat(this.balance) * 100;
        DM.editCardBalance({type: this.type, id: this.card.id, balance}).then(() => {
            this.updateLocalData(balance);
            this.open = false;
        }).catch(error => {
            this.dialog('We could not complete the current action.');
        });
    }
    
    changed(){
        
    }

    validateForm(){
        const newBalance = parseFloat(this.balance);
        if(newBalance < 0){
            this.dialog('Amount cannot be negative, Please type a valid value.');
        }else{
            return true;
        }
        return false;
    }

    updateLocalData(balance: number){
        this.card.balance = balance;
        // @ts-ignore
        this.updateCardBalance({type: this.type, card: this.card});
    }

    handle(payload: any){
        //@ts-ignore
        const barcode = this.loyaltyCard.barcode;
        this.resetForm();
        this.title = 'Loyalty-' + barcode;

        // @ts-ignore
        this.amount = this.loyaltyPoints / 100;

        this.open = true;
    }

    resetForm(){
        this.loading = false;
    }

    dialog(text: string, ref?: string){
        this.loading = false;
        this.dialogData.text = text;
        this.dialogData.ref = ref;
        this.dialogData.open = true;
    }
    dialogAnswer(answer: string){
        if(answer == 'OK' && this.dialogData.ref == 'success'){
            this.open = false;
        }
    }

    created(){
        // @ts-ignore
        MxHelper.registerFunction('addLoyaltyPoints', (payload: any) => {
            this.handle(payload);
        });
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
h2{
    margin-top: 0;
}
hr{
    margin: 1.4rem 0 1rem 0;
}
.change-label{
    font-size: 1.3rem;
    margin-left: 1rem;
    &.positive{
        color: $green;
    }
    &.negative{
        color: $red;
    }
}
</style>

