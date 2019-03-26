<template>
    <div>
        <h3 class="vm-normal">
            <sui-icon name="book" />
            Order #: {{ orderId }}
        </h3>
            <sui-label color="blue" icon="info circle" v-if="true" class="lbl">Preffer receipt</sui-label>
        <h3 class="vm-normal">
            <sui-icon name="user" />
            Customer: {{ clientName }}
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
import { mapState } from 'vuex';

@Component({
    components: {
        OrderSummary,
        ClientHistory,
    },
    computed: {
        ...mapState(['client']),
        clientName: function () {
            // @ts-ignore
            if(this.client.id == 0){
                return 'WALK IN';
            }else{
                // @ts-ignore
                return this.client.first_name + ' ' + this.client.last_name;
            }
        }
    },
})
export default class AreaA extends Vue{

    private view: string = "order";

    private orderId: number = 179;

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

