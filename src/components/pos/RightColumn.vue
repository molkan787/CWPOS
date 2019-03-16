<template>
    <div class="ui attached vertical segment no-padding">
        
        <sui-segment attached class="padding-2">
            <TripleButton :texts="['OTHER','RESTART','QUIT APP']" @click="buttonClicked" />
        </sui-segment>

        <sui-segment attached class="row1-block">
            <Payments />
        </sui-segment>
        <sui-segment attached>
            Test Foo Bar
        </sui-segment>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TripleButton from '../Elts/TripleButton.vue';
import Payments from './Payments/Payments.vue';

@Component({
    components: {
        TripleButton,
        Payments
    }
})
export default class RightColumn extends Vue{
    buttonClicked(comp: any, btnIdx: number){
        console.log('Clicked: ' + btnIdx)
    }
}
</script>