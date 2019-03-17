<template>
    <div>
        <sui-button v-for="(method, index) in methods" :key="index"
        :class="currentMethod == method.name ? 'blue' : ''"
        @click="currentMethod = method.name">
            {{ method.text }}
        </sui-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class PaymentMethods extends Vue{
    private methods: {}[] = [
        {name: 'cash', text: 'Cash'},
        {name: 'prepaid', text: 'Prepaid Card'},
        {name: 'invoice_ari', text: 'Invoice or Ari'},
        {name: 'card', text: 'Credit/Debit Card'},
        {name: 'loyalty', text: 'Loyalty Card'},
        {name: 'other', text: 'Other or Free'},
    ];

    private currentMethod = '';
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
    // padding-left: 0 !important;
    // padding-right: 0 !important;
    i{
        margin: 0 !important;
    }
}
.positive-color{
    color: $black;
}
</style>