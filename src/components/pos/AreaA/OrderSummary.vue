<template>
    <div class="m-el">
        <sui-segment attached class="items">
            <OrderItem v-for="(item, index) in pos.items" :key="index" :text="item.name" :amount="item.price"/>
            <div v-if="pos.items.length == 0" class="empty-text">No item added</div>
        </sui-segment>
        <Totals class="totals" />
        <!-- <button @click="addItem()">Add</button>       -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex';
import Component from 'vue-class-component';
import OrderItem from './OrderItem.vue';
import Totals from './Totals.vue';

@Component({
    components:{
        OrderItem,
        Totals,
    },
    computed: {
        ...mapState(['pos'])
    }
})
export default class OrderSummary extends Vue{

}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
div.m-el{
    div.segment{
        padding: 0 !important;
        overflow-x: hidden;
        overflow-y: scroll;
        
        &.items{
            height: $block1-height * 0.3;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
        }
        &.totals{
            height: $block1-height * 0.488;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
        }
    }
}
div.empty-text{
    padding-top: 3.7rem;
    font-style: italic;
    text-align: center;
    font-size: 1.5rem;
    color: #aaa;
}
</style>
