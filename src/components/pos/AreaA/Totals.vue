<template>
    <div class="ui attached segment">
        <TotalsItem v-for="(item, index) in items" :key="index"
            :text="item.text" :amount="pos.values[item.name]"
            :special="item.special"
            :lowImportance="item.lowImportance"
            :halfSize="item.halfSize"
            :colors="item.colors" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import TotalsItem from './TotalsItem.vue';

@Component({
    components: {
        TotalsItem,
    },
    computed: {
        ...mapState(['pos'])
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

}
</script>


