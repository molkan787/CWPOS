<template>
    <div>
        <h3>Latest orders</h3>
        <div class="tableParent">
            <sui-table celled striped>
                <sui-table-header>
                    <sui-table-row class="throw">
                        <sui-table-headerCell>Date</sui-table-headerCell>
                        <sui-table-headerCell>Amount</sui-table-headerCell>
                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>

                    <sui-table-row class="trow" v-for="(item, index) in items" :key="index">
                        <sui-table-cell>
                            {{ item.date }}
                        </sui-table-cell>
                        <sui-table-cell>
                            {{ item.amount | price }}
                        </sui-table-cell>
                        
                    </sui-table-row>

                </sui-table-body>
            </sui-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
    computed: mapState({
        items: (state: any) => state.client.history
    })
})
export default class ClientHistory extends Vue{}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
h3{
    margin-top: 0rem;
    margin-bottom: 0.7rem;
}
.tableParent{
    border: 1px solid rgba(34,36,38, 0.15);
    height: $block1-height - 9rem;
    background-color: #f9f9f9;
}
.ui.table{
    border: none;
    border-bottom: 1px solid rgba(34,36,38,.1);
    border-radius: 0;
}

$mrg: 4px;
.trow > td{
    padding-top: $mrg !important;
    padding-bottom: $mrg !important;
}
.throw > th{
    padding-top: $mrg !important;
    padding-bottom: $mrg !important;
}
</style>
