<template>
    <Modal v-model="open" title="Tools">
        <h3>Receipt</h3>
        <sui-button :disabled="!nextOrderId" @click="printReceipt" icon="file alternate">Print receipt of the last order</sui-button>
        
        <template v-slot:buttons>
            <sui-button @click="close">Close</sui-button>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '../Elts/Modal.vue';
import Component from 'vue-class-component';
import MxHelper from '@/prs/MxHelper';
import Comu from '@/prs/comu';
import { mapState } from 'vuex';


@Component({
    components: {
        Modal,
    },
    computed: mapState(['nextOrderId'])
})
export default class ToolsModal extends Vue{
    private open: boolean = false;

    close(){
        this.open = false;
    }

    printReceipt(){
        Comu.reprintReceipt();
    }

    created(){
        // @ts-ignore
        MxHelper.registerFunction('openToolsModal', () => this.open = true);
    }

}
</script>

<style scoped lang="scss">

</style>