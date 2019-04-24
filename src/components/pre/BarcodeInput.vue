<template>
    <div class="barcodeinput">
        <h3>Scan or type barcode here</h3>
        <sui-input placeholder="123012301230"
        icon="barcode" v-model="pvalue" @change="change" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import barcodeScanner from '@/prs/barcodeScanner';


@Component({
    watch: {
        value: function(newVal: any) {
            // @ts-ignore
            this.pvalue = newVal;
        },
        listen: function(newVal: boolean, oldVal: boolean){
            this.updateBinding(newVal, oldVal);
        }
    }
})
export default class BarcodeInput extends Vue{

    @Prop({default: false}) listen!: boolean;
    @Prop({default: ''}) value!: string;
    private pvalue: string = '';

    change(){
        this.$emit('input', this.pvalue);
    }

    mounted(){
        this.pvalue = this.value;
    }

    handleScan(barcode: string){
        this.pvalue = barcode;
        this.change();
        this.$emit('scanned', barcode);
    }

    updateBinding(newState: boolean, oldState: boolean){
        if(newState == oldState) return;
        if(newState){
            barcodeScanner.bind((barcode: string) => this.handleScan(barcode));
        }else{
            barcodeScanner.unBind();
        }
    }
}
</script>

<style lang="scss">
@import '@/scss/vars.scss';

div.barcodeinput{
    width: 24rem;
    margin: auto;
    padding: 1rem 2rem;
    background-color: $grey;
    border-radius: 4px;
    text-align: center;
    h3{
        font-size: 1.5rem;
    }
    div {
        font-size: 1.2rem !important;
        input{
            background: #f9f9f9 !important;
        }
    }
}
</style>
