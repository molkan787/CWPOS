<template>
    <div>
        <hr>
        <h2>
            Invoice / Ari
        </h2>
        <sui-dropdown
            button
            class="icon"
            floating
            icon="building"
            labeled
            :options="companies"
            search
            text="Select Company"
            noResultsMessage="Company not found"
            v-model="current"
        />
        <div>
            <sui-button :icon="pos.finished ? 'circle check' : ''" size="large"
            :class="pos.finished ? 'green' : ''" @click="finish">
                <span v-if="pos.finished">Finished</span>
                <span v-else>Finish</span>
            </sui-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import Component from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import Payments from '@/prs/payments';

@Component({
    computed: mapState(['pos', 'companies']),
    methods: mapActions(['setClientId']),
})
export default class InvoicePayment extends Vue{

    private current: any = null;

    finish(){
        // @ts-ignore
        if(this.pos.finished) return;
        if(this.current){
            // @ts-ignore
            this.setClientId(this.current);
            Payments.requestPayment('other', {});
        }else{
            this.$emit('message', 'Please select Company');
        }
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';

hr{
    margin: 2rem 0 1.5rem 0;
}
div{
    text-align: center;
    button{
        width: 60%;
        padding: 1.2rem !important;
    }
}
button.dropdown{
    margin-bottom: 1rem;
    font-size: 1.2rem;
}
</style>

<style>
.dropdown > div > div.item{
    font-size: 1.3rem !important;
}
</style>