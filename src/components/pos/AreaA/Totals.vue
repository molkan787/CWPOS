<template>
    <div class="ui attached segment">
        <TotalsItem v-for="(item, index) in items" :key="index"
            :text="item.text" :amount="values[item.name]"
            :special="item.special"
            :lowImportance="item.lowImportance"
            :halfSize="item.halfSize"
            :colors="item.colors" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TotalsItem from './TotalsItem.vue';

@Component({
    filters:{
        price: function (value: any){
            return '$' + parseFloat(value).toFixed(2);
        }
    },
    components: {
        TotalsItem,
    }
})
export default class Totals extends Vue{

    constructor(){
        super();
        // setInterval(() => this.values.changeDue--, 1000);
    }

    private items = [
        {name: 'discount', text: 'Discount'},
        {name: 'subTotal', text: 'Sub-Total', lowImportance: true},
        {name: 'taxGST', text: 'Tax GST', lowImportance: true},
        {name: 'taxQST', text: 'Tax QST', lowImportance: true},
        {name: 'total', text: 'Total', special: true},
        {name: 'paidCash', text: 'Paid Cash', halfSize: true},
        {name: 'changeDue', text: 'Change Due', halfSize: true, colors: true}
    ];
    
    values = {
        discount: -5,
        subTotal: 34.6,
        taxGST: 0.5,
        taxQST: 1.03,
        total: 34.6,
        paidCash: 50,
        changeDue: 3
    };

}
</script>

<style lang="scss" scoped>
div.segment{
}
</style>


