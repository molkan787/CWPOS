<template>
    <DataTable :cols="cols" :items="clients" :loading="loading"
    :filtersSchema="filtersSchema" :filtersValues="filtersValues"
    @filtersChanged="loadData" @edit="editClick" @delete="deleteClick" :controlls="controlls" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataTable from '../Elts/DataTable.vue';
import { mapState } from 'vuex';
import Dl from '@/prs/dl';
import DM from '@/prs/dm';
import Pfs from '@/prs/pfs';
import MxHelper from '@/prs/MxHelper';
import Message from '@/ccs/Message';

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
        {name: 'Prepaid Card', prop: 'prepaid', filter: 'pol_barcode', default: '---'},
        {name: 'Loyalty Card', prop: 'loyalty', filter: 'pol_barcode', default: '---'},
        {name: '', prop: 'id', buttons: [
            {name: 'edit', text: '', icon: 'edit'},
            {name: 'delete', text: '', icon: 'delete'},
        ]},
    ];

    private controlls = [
        {icon: 'plus', text: 'ADD CLIENT', handler: () => this.addClient() }
    ];

    private filtersSchema = Pfs.clients;

    editClick(id: number){
        // @ts-ignore
        MxHelper.editClient({id});
    }

    async deleteClick(id: number){
        // @ts-ignore
        let client = this.clients.filter((item: any) => item.id == id);
        if(client.length) client = client[0];
        else return;
        Message.ask(`Do you realy want to delete client "${client.first_name} ${client.last_name}" ?`)
        .then((e: any) => {
            if(e.answer){
                e.loading();
                DM.deleteClient({id}).then((result: boolean) =>  e.hide())
                .catch(err => {
                    e.dialog.show('We could not complete the current action.');
                });
            }else{
                e.hide();
            }
        });
    }

    loadData(){
        this.loading = true;
        // @ts-ignore
        Dl.getClients(this.filtersValues).catch(error => {
            console.log('Error: ', error);
        }).finally(() => {
            this.loading = false;
        });
    }

    addClient(){
        // @ts-ignore
        MxHelper.editClient({id: 'new'});
    }

    created(){
        // @ts-ignore
        if(!this.loaded) this.loadData();
    }
}
</script>

