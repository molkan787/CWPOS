<template>
    <div class="ui attached vertical segment no-padding">

        <sui-segment attached class="padding-2">
            <TripleButton :texts="['NEW PREPAID','RELOAD PREPAID','GIFT CERTIFICATE']"
                :colors="['orange', 'black', 'grey']" @click="buttonClicked" />
        </sui-segment>

        <sui-segment attached class="row1-block">
            <Products />
        </sui-segment>
        <sui-segment attached class="row2-block">
            <Adjustment />
        </sui-segment>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TripleButton from '../Elts/TripleButton.vue';
import Products from './Products/Products.vue';
import Adjustment from './Adjustment/Adjustment.vue';

@Component({
    components: {
        TripleButton,
        Products,
        Adjustment,
    }
})
export default class CenterColumn extends Vue{
    buttonClicked(comp: any, btnIdx: number){
        console.log('Clicked: ' + btnIdx)
    }
}
</script>