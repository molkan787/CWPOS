<template>
    <div>
        <h3 class="vm-normal">
            <sui-icon name="book" />
            Order #: {{ orderId }}
        </h3>
            <sui-label color="blue" icon="info circle" v-if="customer.receipt" class="lbl">Preffer receipt</sui-label>
        <h3 class="vm-normal">
            <sui-icon name="user" />
            Customer: {{ customer.name }}
        </h3>
        <hr>
        <OrderSummary v-if="view == 'order'" />
        <ClientHistory v-if="view == 'history'" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderSummary from './OrderSummary.vue';
import ClientHistory from './ClientHistory.vue';

@Component({
    components: {
        OrderSummary,
        ClientHistory,
    }
})
export default class AreaA extends Vue{
    orderId: number = 179;
    customer = {
        name: 'WALK IN',
        receipt: true
    };

    view: string = "order";
}
</script>


<style lang="scss" scoped>
div{
    text-align: left;
}
.lbl{
    float: right !important;
}
</style>

