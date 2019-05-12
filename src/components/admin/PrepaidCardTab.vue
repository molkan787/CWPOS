<template>
    <DataTable :cols="cols" :items="cards" :loading="loading"
    :filtersSchema="filtersSchema" :filtersValues="filtersValues"
    :controlls="controlls"
    @filtersChanged="loadData" @editBalance="editBalance"
    @exportHistory="exportHistory" @deleteCard="deleteCard" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import DataTable from '../Elts/DataTable.vue';
import { mapState } from 'vuex';
import Dl from '@/prs/dl';
import DM from '@/prs/dm';
import pfs from '@/prs/pfs';
import MxHelper from '@/prs/MxHelper';
import Message from '@/ccs/Message';

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
        {name: 'Activation date', prop: 'date_added', filter: 'ts2datetime'},
        {name: 'Client', prop: 'client', filter: 'joinnames', default: '---'},
        {name: 'Balance', prop: 'balance', filter: 'price_m'},
        {name: 'Options', prop: '@', buttons: [
            {name: 'editBalance', text: '', icon: 'edit'},
            {name: 'exportHistory', text: '', icon: 'download'},
            {name: 'deleteCard', text: '', icon: 'delete'},
        ]}
    ];

    private controlls = [
        {text: 'Import', icon: 'plus', handler: () => { this.importData() }},
        {text: 'Export', icon: 'download', handler: () => { this.exportData() }}
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

    private editBalance(card: any){
        // @ts-ignore
        MxHelper.editCardBalance({card, type: 'prepaid'});
    }

    private exportHistory(card: any){
        // @ts-ignore
        MxHelper.openDataExportWizard({dataName: 'prepaid:' + card.id, barcode: card.barcode});
    }

    private deleteCard(card: any){
        Message.ask(`Do you realy want to delete this prepaid card ?\n(${card.barcode})`)
        .then((e: any) => {
            if(e.answer){
                e.loading();
                DM.deleteCard({type: 'prepaid', id: card.id}).then(() => {
                    e.hide(); 
                }).catch(err => {
                    e.dialog.show('We could not complete the current action.');
                });
            }else{
                e.hide();
            }
        });
    }

    private importData(){
        // @ts-ignore
        MxHelper.openDataImportWizard({title: 'Import Prepaid Cards', dest: 'prepaids'});
    }

    private exportData(){
        // @ts-ignore
        MxHelper.openDataExportWizard({dataName: 'prepaids'});
    }

    created(){
        // @ts-ignore
        if(!this.loaded) this.loadData();
    }
}
</script>

