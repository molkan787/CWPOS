<template>
    <div>
        <sui-button :class="currentDiscount == '3' ? 'blue' : ''"
        icon="tag" @click="setDiscount('3')"><br>Promo $3 OFF</sui-button>

        <sui-button :class="currentDiscount == '5' ? 'blue' : ''"
        icon="tag" @click="setDiscount('5')"><br>Promo $5 OFF</sui-button>

        <sui-button :class="currentDiscount == 'full' ? 'blue' : ''"
        icon="tag" @click="setDiscount('full')"><br>FULL Discount</sui-button>

        <sui-button icon="tags" :class="currentDiscount == 'custom' ? 'blue' : ''"
        ><br>Other Discount</sui-button>

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

@Component
export default class Adjustment extends Vue{
    private currentDiscount: string = '';
    private extraCharge: number = 0;
    private tipAmount: number = 10;

    setDiscount(discount: string){
        if(this.currentDiscount == discount)
            this.currentDiscount = '';
        else
            this.currentDiscount = discount;
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

