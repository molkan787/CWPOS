<template>
    <DataTable :cols="cols" :items="users" :loading="loading" :filtersValues="filtersValues"
    @filtersChanged="loadData" @edit="editClick" @delete="deleteClick" />
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
        users: (state: any) => state.data.users,
        loaded: (state: any) => state.dataState.users,
    }),
})
export default class UsersTab extends Vue{
    private loading: boolean = false;

    private cols = [
        {name: 'Id', prop: 'id'},
        {name: 'Added date', prop: 'date_added', filter: 'ts2date'},
        {name: 'First Name', prop: 'first_name'},
        {name: 'Last Name', prop: 'last_name'},
        {name: 'Username', prop: 'username'},
        {name: 'Options', prop: 'id', buttons: [
            {name: 'edit', text: 'Edit', icon: 'edit'},
            {name: 'delete', text: 'Delete', icon: 'delete'},
        ]},
    ];

    private filtersValues = {};

    loadData(){
        this.loading = true;
        Dl.getUsers(this.filtersValues).catch(error => {
            console.log('Error: ', error);
        }).finally(() => {
            this.loading = false;
        });
    }

    editClick(userId: any){
        console.log(`Edit #${userId}`);
    }

    deleteClick(userId: any){
        console.log(`Delete #${userId}`);
    }

    created(){
        // @ts-ignore
        if(!this.loaded) this.loadData();
    }
}
</script>

