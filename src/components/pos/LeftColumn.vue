<template>
    <div class="ui attached vertical segment no-padding">

        <sui-segment attached class="padding-2">
            <TripleButton :texts="['REGULAR WASH','PREPAID WASH','DETAILING']"
                :colors="['blue', 'red', 'green']" @click="buttonClicked" />
        </sui-segment>

        <sui-segment attached class="row1-block">
            <AreaA />
        </sui-segment>
        <sui-segment attached class="row2-block">
            <Stats />
        </sui-segment>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TripleButton from '../Elts/TripleButton.vue';
import AreaA from './AreaA/AreaA.vue';
import Stats from './Stats/Stats.vue';

@Component({
    components: {
        TripleButton,
        AreaA,
        Stats,
    }
})
export default class LeftColumn extends Vue{
    buttonClicked(comp: any, btnIdx: number){
        console.log('Clicked: ' + btnIdx)
    }
}
</script>