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
import MxHelper from '@/prs/MxHelper';

@Component({
    watch: {
        value: function(newVal) {
            // @ts-ignore
            this.pvalue = newVal;
        }
    }
})
export default class BarcodeInput extends Vue{

    @Prop({default: false}) react!: boolean;
    @Prop({default: ''}) value!: string;
    private pvalue: string = '';

    change(){
        this.$emit('input', this.pvalue);
    }

    mounted(){
        this.pvalue = this.value;
    }

    created(){
        // @ts-ignore
        MxHelper.addBarcodeHandler((barcode: string) => {
            this.pvalue = barcode;
            this.change();
        });
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
