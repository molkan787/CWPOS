<template>
    <DataTable :cols="tableSchema" :items="orders" :loading="loading" 
    :filtersSchema="filtersSchema" :filtersValues="filtersValues"
    @filtersChanged="loadData" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataTable from '../Elts/DataTable.vue';
import { mapState } from 'vuex';
import Dl from '@/prs/dl';
import Pfs from '@/prs/pfs';

@Component({
    components: {
        DataTable
    },
    computed: mapState({
        orders: (state: any) => state.data.orders,
        loaded: (state: any) => state.dataState.orders,
        filtersValues: (state: any) => state.filtersState.orders,
    }),
})
export default class OrdersTab extends Vue{

    private loading: boolean = false;

    private tableSchema = [
        {name: 'Id', prop: 'id'},
        {name: 'Client', prop: 'client', filter: 'joinnames', default: 'WALK IN'},
        {name: 'Order Date', prop: 'date_added', filter: 'ts2date'},
        {name: 'Payment method', prop: 'pay_method', filter: 'paym'},
        {name: 'Order value', prop: 'total', filter: 'price_m'},
        {name: 'Receipt', prop: 'receipt', filter: 'yesIfTrue'},
        {name: 'Cashier', prop: 'cashier', filter: 'joinnames'},
    ];

    private filtersSchema = Pfs.orders;

    loadData(){
        this.loading = true;
        // @ts-ignore
        Dl.getOrders(this.filtersValues).catch(error => {
            console.log('Error: ', error);
        }).finally(() => {
            this.loading = false;
        });
    }

    created(){
        // @ts-ignore
        if(!this.loaded) this.loadData();
    }
}
</script>
