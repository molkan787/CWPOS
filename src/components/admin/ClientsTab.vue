<template>
    <DataTable :cols="cols" :items="clients" :loading="loading"
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
        clients: (state: any) => state.data.clients,
        loaded: (state: any) => state.dataState.clients,
        filtersValues: (state: any) => state.filtersState.clients,
    }),
})
export default class ClientsTab extends Vue{
    private loading: boolean = false;

    private cols = [
        {name: 'Id', prop: 'id'},
        {name: 'Added date', prop: 'date_added', filter: 'ts2date'},
        {name: 'Phone', prop: 'phone'},
        {name: 'Email', prop: 'email'},
        {name: 'First Name', prop: 'first_name'},
        {name: 'Last Name', prop: 'last_name'},
    ];

    private filtersSchema = Pfs.clients;

    loadData(){
        this.loading = true;
        // @ts-ignore
        Dl.getClients(this.filtersValues).catch(error => {
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

