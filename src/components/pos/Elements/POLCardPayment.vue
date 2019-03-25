<template>
    <div>
        <hr>
        <h2 v-if="pos.pay_method == 'prepaid'">
            <i class="ticket icon"></i>
            Prepaid Card
        </h2>
        <h2 v-if="pos.pay_method == 'loyalty'">
            <i class="ticket icon"></i>
            Loyalty Card
        </h2>
        <BarcodeInput @scanned="finish" v-model="barcode" class="barcodeInput" />
        <div>
            <sui-button :icon="pos.finished ? 'circle check' : ''" size="large"
            :class="pos.finished ? 'green' : ''" @click="finish">
                <span v-if="pos.finished">Finished</span>
                <span v-else>Finish</span>
            </sui-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import BarcodeInput from '../../pre/BarcodeInput.vue';
import { mapState, mapActions } from 'vuex';
import Payments from '@/prs/payments';

@Component({
    components: {
        BarcodeInput,
    },
    computed: mapState(['pos']),
    methods: mapActions(['markAsPaid']),
})
export default class POLCardPayment extends Vue{

    @Prop({default: {}}) bus!: any;
    private barcode: string = '';

    finish(){
        if(this.barcode.length < 10){
            this.$emit('message', 'Please scan or type Card Barcode.');
            return;
        }
        // @ts-ignore
        Payments.requestPayment(this.pos.pay_method, {
            barcode: this.barcode
        });
    }
    start(talkingTo: string){
        // if(talkingTo !== 'cash') return;
    }
    mounted() {
        // @ts-ignore;
        this.bus.$on('start', this.start);
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';

hr{
    margin: 2rem 0 1.5rem 0;
}
div{
    text-align: center;
    button{
        width: 24rem;
        padding: 1.2rem !important;
    }
}
.barcodeInput{
    margin-bottom: 1rem;
}
</style>
