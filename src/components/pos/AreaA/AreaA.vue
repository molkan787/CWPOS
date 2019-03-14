<template>
    <div>
        <h3 class="vm-normal">Order #: {{ orderId }}</h3>
        <h3 class="vm-normal">Customer: {{ customer }}</h3>
        <hr>
        <OrderSummary v-if="view == 'order'" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderSummary from './OrderSummary.vue';

@Component({
    components: {
        OrderSummary,
    }
})
export default class AreaA extends Vue{
    orderId: number = 179;
    customer: string = 'WALK IN';

    view: string = "order";
}
</script>


<style lang="scss" scoped>
div{
    text-align: left;
}
</style>

