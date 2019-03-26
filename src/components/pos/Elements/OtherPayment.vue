<template>
    <div>
        <hr>
        <h2>
            Other Payment / Free
        </h2>
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
import { mapState } from 'vuex';
import Payments from '@/prs/payments';

@Component({
    computed: mapState(['pos']),
})
export default class OtherPayment extends Vue{

    finish(){
        Payments.requestPayment('other', {});
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
</style>
