<template>
    <Modal v-model="postingOrder" title="Payment">

        <template v-slot:default>
            <CashPayment v-if="pos.pay_method == 'cash'"/>
        </template>

        <template v-slot:buttons>
            <sui-button v-if="pos.finished" @click="printReceipt" icon="file alternate">Print Receipt</sui-button>
            <sui-button v-if="pos.finished" @click="cancelOrderPosting(true)">Close</sui-button>
            <sui-button v-else @click="cancelOrderPosting(false)">Cancel</sui-button>
        </template>

    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Modal from '../../Elts/Modal.vue';
import Comu from '@/prs/comu';
import { mapActions, mapState } from 'vuex';
import { Prop } from 'vue-property-decorator';

import CashPayment from './CashPayment.vue';

@Component({
    components: {
        Modal,
        CashPayment
    },
    computed: {
        ...mapState(['postingOrder', 'pos'])
    },
    methods: {
        ...mapActions(['cancelOrderPosting'])
    }
})
export default class PaymentModal extends Vue{
    printReceipt(){
        // @ts-ignore
        Comu.printReceipt();
    }
}
</script>
