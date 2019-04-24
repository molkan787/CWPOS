<template>
    <div class="ui attached vertical segment no-padding">
        
        <sui-segment attached class="padding-2">
            <TripleButton :texts="['CLEAR POS','OPTIONS','QUIT APP']" @click="buttonClicked" />
        </sui-segment>

        <sui-segment attached class="row1-block">
            <Payments />
        </sui-segment>
        <sui-segment attached class="row2-block">
            <PaymentMethods />
        </sui-segment>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Comu from '@/prs/comu';
import App from '@/app_service';
import Message from '@/ccs/Message';
import MxHelper from '@/prs/MxHelper';
import Component from 'vue-class-component';
import TripleButton from '../Elts/TripleButton.vue';
import Payments from './Payments/Payments.vue';
import PaymentMethods from './PaymentMethods/PaymentMethods.vue';

@Component({
    components: {
        TripleButton,
        Payments,
        PaymentMethods
    }
})
export default class RightColumn extends Vue{
    buttonClicked(comp: any, btnIdx: number){
        if(btnIdx == 0){
            Comu.reset();
        }else if(btnIdx == 1){
            // @ts-ignore
            MxHelper.openOptions();
            // Message.ask('Are you sure you want to restart the app?').then((e: any) => {
            //     e.hide();
            //     if(e.answer){
            //         App.restart();
            //     }
            // });
        }else if(btnIdx == 2){
            Message.ask('Are you sure you want to quit the app?').then((e: any) => {
                e.hide();
                if(e.answer){
                    App.quit();
                }
            });
        }
    }
}
</script>

<style scoped>
.row1-block{
    z-index: 1;
}
</style>

