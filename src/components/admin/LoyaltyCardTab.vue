<template>
    <DataTable :cols="cols" :items="cards" :loading="loading"
    :filtersSchema="filtersSchema" :filtersValues="filtersValues"
    @filtersChanged="loadData" @editBalance="editBalance" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataTable from '../Elts/DataTable.vue';
import { mapState } from 'vuex';
import Dl from '@/prs/dl';
import pfs from '@/prs/pfs';
import MxHelper from '@/prs/MxHelper';

@Component({
    components: {
        DataTable
    },
    computed: mapState({
        cards: (state: any) => state.data.loyalty,
        loaded: (state: any) => state.dataState.loyalty,
        filtersValues: (state: any) => state.filtersState.loyalty,
    }),
})
export default class LoyaltyCardTab extends Vue{
    private loading: boolean = false;

    private cols = [
        {name: 'Barcode', prop: 'barcode'},
        {name: 'Activation date', prop: 'date_added', filter: 'ts2date'},
        {name: 'Client', prop: 'client', filter: 'joinnames', default: '---'},
        {name: 'Balance', prop: 'balance', filter: 'price_m'},
        {name: 'Options', prop: '@', buttons: [
            {name: 'editBalance', text: 'Edit balance', icon: 'edit'}
        ]}
    ];

    private filtersSchema = pfs.POLCards;

    private loadData(){
        this.loading = true;
        // @ts-ignore
        Dl.getLoyaltyCards(this.filtersValues).catch(error => {
            console.log('Error: ', error);
        }).finally(() => {
            this.loading = false;
        });
    }

    private editBalance(card: any){
        // @ts-ignore
        MxHelper.editCardBalance({card, type: 'loyalty'});
    }

    created(){
        // @ts-ignore
        if(!this.loaded) this.loadData();
    }
}
</script>

