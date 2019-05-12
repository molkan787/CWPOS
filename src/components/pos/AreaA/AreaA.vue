<template>
    <div>
        <h3 class="vm-normal">
            <sui-icon name="book" />
            Order #: {{ nextOrderId }}
            <span class="lbl" :class="!loyaltyCard.id ? 'low-imp' : ''"><span>LOY BAL: </span>
                <template v-if="loyaltyCard.id">
                    {{ loyaltyCard.balance | price_m }}
                </template>
                <template v-else>---</template>
            </span>
        </h3>
            <sui-label color="blue" icon="info circle" v-if="client.want_receipt" class="lbl">Preffer receipt</sui-label>
        <h3 class="vm-normal">
            <sui-icon name="user" />
            Customer: {{ clientName }}
            <span class="lbl" :class="!prepaidCard.id ? 'low-imp' : ''"><span>PP BAL: </span>
                <template v-if="prepaidCard.id">
                    {{ prepaidCard.balance | price_m }}
                </template>
                <template v-else>---</template>
            </span>
        </h3>
        <hr>
        <ClientHistory v-if="areaAView == 'history'" />
        <OrderSummary v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrderSummary from './OrderSummary.vue';
import ClientHistory from './ClientHistory.vue';
import { mapState } from 'vuex';
import Comu from '@/prs/comu';

@Component({
    components: {
        OrderSummary,
        ClientHistory,
    },
    computed: {
        ...mapState(['client', 'areaAView', 'nextOrderId', 'loyaltyCard', 'prepaidCard']),
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

    private orderId: number = 0;

}
</script>


<style lang="scss" scoped>
div{
    text-align: left;
}
.lbl{
    float: right !important;
    span{
        opacity: 0.7;
    }
}
.low-imp{
    opacity: 0.5;
}
</style>

