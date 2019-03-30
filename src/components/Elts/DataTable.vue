<template>
    <div>
        <Filters v-if="filtersSchema.length" :items="filtersSchema" :values="filtersValues" @changed="filtersChanged" />
        <div class="dataTable dimmable">
            <div class="ui active inverted dimmer" v-if="loading">
                <div class="ui loader"></div>
            </div>
            <sui-table celled striped size="large">
                <sui-table-header>
                    <sui-table-row>

                        <sui-table-header-cell v-for="(col, index) in cols" :key="index">
                            {{ col.name }}
                        </sui-table-header-cell>

                    </sui-table-row>
                </sui-table-header>

                <sui-table-body>

                    <sui-table-row v-for="(item, index) in items" :key="index">

                        <sui-table-cell v-for="(col, index) in cols" :key="index">

                            <template v-if="col.buttons">
                                <sui-button v-for="(btn, index) in col.buttons" :key="index"
                                @click="buttonClick(btn.name, item[col.prop])">
                                    <i v-if="btn.icon" :class="btn.icon + ' icon'"></i>
                                    {{ btn.text }}
                                </sui-button>
                            </template>

                            <template v-else-if="item[col.prop] || item[col.prop] == 0">
                                {{ applyFilter(col.filter, item[col.prop]) || col.default || '---' }}
                            </template>
                            <template v-else>{{ col.default }}</template>
                        </sui-table-cell>

                    </sui-table-row>

                </sui-table-body>

                <sui-table-footer>
                    <sui-table-row>
                        <sui-table-header-cell colspan="6">
                        <sui-menu v-sui-floated:right pagination>
                            <a is="sui-menu-item" @click="prevClick" :disabled="page == 1">
                                <sui-icon name="left chevron" />
                            </a>
                            <a is="sui-menu-item">{{ page }}</a>
                            <a is="sui-menu-item" @click="nextClick" :disabled="items.length < itemsPerPage">
                                <sui-icon name="right chevron" />
                            </a>
                        </sui-menu>
                        </sui-table-header-cell>
                    </sui-table-row>
                </sui-table-footer>
            </sui-table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Filters from '../Elts/Filters.vue';
import OrdersLoader from '@/prs/ordersLoader';
import { Prop } from 'vue-property-decorator';

@Component({
    components: {
        Filters
    },
})
export default class DataTable extends Vue{

    private itemsPerPage = 10;
    private page = 1;

    @Prop({default: false}) loading!: boolean;

    @Prop({default: () => []}) cols!: any[];
    @Prop({default: () => []}) items!: any[];

    @Prop({default: () => []}) filtersSchema!: any[];
    @Prop({default: () => {}}) filtersValues!: any;

    applyFilter(filterName: string, value: any){
        if(filterName)
            return Vue.filter(filterName)(value);
        else
            return value;
    }

    filtersChanged(filters: any){
        // this.$emit('filtersChanged', filters);
        this.page = 1;
        this.updateOffset();
        this.emitFiltersChanged();
    }

    prevClick(){
        this.changePage(-1);
    }

    nextClick(){
        this.changePage(1);
    }

    buttonClick(eventName: string, payload: any){
        this.$emit(eventName, payload);
    }

    changePage(dir: number){
        if((dir < 0 && this.page == 1) || (dir > 0 && this.items.length < this.itemsPerPage)) return;
        this.page += dir;
        this.updateOffset();
        this.emitFiltersChanged();
    }

    updateOffset(){
        this.filtersValues.offset = (this.page - 1) * this.itemsPerPage;
    }

    emitFiltersChanged(){
        this.$emit('filtersChanged', this.filtersValues);
    }

    created(){
        this.updateOffset();
    }

}
</script>

<style lang="scss" scoped>
hr{
    margin: 1rem 0 0.5rem 0;
}
.special-cell{
    color: #888;
    font-style: italic;
}
.user-cell > i{
    opacity: 0.5;
}

</style>
