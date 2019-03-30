<template>
    <DataTable :cols="cols" :items="cards" :loading="loading"
    :filtersSchema="filtersSchema" :filtersValues="filtersValues"
    @filtersChanged="loadData" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataTable from '../Elts/DataTable.vue';
import { mapState } from 'vuex';
import Dl from '@/prs/dl';
import pfs from '@/prs/pfs';

@Component({
    components: {
        DataTable
    },
    computed: mapState({
        cards: (state: any) => state.data.prepaid,
        loaded: (state: any) => state.dataState.prepaid,
        filtersValues: (state: any) => state.filtersState.prepaid,
    }),
})
export default class PrepaidCardTab extends Vue{
    private loading: boolean = false;

    private cols = [
        {name: 'Barcode', prop: 'barcode'},
        {name: 'Activation date', prop: 'date_added', filter: 'ts2date'},
        {name: 'Client', prop: 'client', filter: 'joinnames', default: '---'},
        {name: 'Balance', prop: 'balance', filter: 'price_m'}
    ];

    private filtersSchema = pfs.POLCards;

    private loadData(){
        this.loading = true;
        // @ts-ignore
        Dl.getPrepaidCards(this.filtersValues).catch(error => {
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

