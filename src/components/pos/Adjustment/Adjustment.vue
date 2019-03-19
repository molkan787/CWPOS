<template>
    <div>
        <sui-button :class="currentDiscount == '3' ? 'grey' : ''"
        icon="tag" @click="putDiscount('3')"><br>Promo $3 OFF</sui-button>

        <sui-button :class="currentDiscount == '5' ? 'grey' : ''"
        icon="tag" @click="putDiscount('5')"><br>Promo $5 OFF</sui-button>

        <sui-button :class="currentDiscount == 'full' ? 'grey' : ''"
        icon="tag" @click="putDiscount('full')"><br>FULL Discount</sui-button>

        <sui-button icon="tags" :class="currentDiscount == 'custom' ? 'grey' : ''">
            <br>Other Discount<br>
            <span v-if="customerDiscount > 0" class="positive-color">({{ customerDiscount | price }})</span>
        </sui-button>

        <sui-button icon="plus square">
            <br>Extra Charge<br>
            <span v-if="extraCharge > 0" class="positive-color">({{ extraCharge | price }})</span>
        </sui-button>
        <sui-button icon="money bill alternate">
            <br>Add Tip<br>
            <span v-if="tipAmount > 0" class="positive-color">({{ tipAmount | price }})</span>
        </sui-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapActions} from 'vuex';

@Component({
    methods:{
        ...mapActions(['setDiscount'])
    }
})
export default class Adjustment extends Vue{
    private currentDiscount: any = '';
    private extraCharge: number = 0;
    private tipAmount: number = 10;
    private customerDiscount = 0;

    putDiscount(discount: string){
        if(this.currentDiscount == discount)
            this.currentDiscount = '';
        else
            this.currentDiscount = discount;
        if(this.currentDiscount == ''){
            // @ts-ignore
            this.setDiscount(0);
        }else if(this.currentDiscount == 'full'){
            // @ts-ignore
            this.setDiscount(this.currentDiscount);
        }else if(this.currentDiscount == 'custom'){
            // @ts-ignore
            this.setDiscount(this.customerDiscount);
        }else{
            // @ts-ignore
            this.setDiscount(parseInt(this.currentDiscount));
        }
            
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
button{
    float: left;
    width: 32%;
    height: 6rem;
    margin-bottom: 0.22rem !important;
    font-size: 1.1rem !important;
    line-height: 1.3 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    i{
        margin: 0 !important;
    }
}
.positive-color{
    color: $green;
}
</style>

