<template>
    <sui-button class="root" @click="rootClick" :class="count > 0 ? 'blue' : ''" >
        <span>{{ text }}</span>
        <div v-if="count > 0">
            <button @click="minusClick" class="ctrl" cancel-click="1">
                <i class="minus icon" cancel-click="1"></i>
            </button>
            <button class="ctrl" disabled>{{ count }}</button>
            <button @click="plusClick" class="ctrl">
                <i class="plus icon"></i>
            </button>
        </div>
    </sui-button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapActions, mapState} from 'vuex';
import { Prop } from 'vue-property-decorator';

@Component({
    computed: { ...mapState(['pos']) },
    methods: { ...mapActions(['incItemCount', 'decItemCount']) }
})
export default class Item extends Vue{

    @Prop({default: ''}) text!: string;
    @Prop({default: ''}) itemId!: string;

    private count: any = 0;

    rootClick(e: any){
        if(this.count > 0) return;
        if(e && e.srcElement && e.srcElement.getAttribute('cancel-click')) return;
        // @ts-ignore
        this.incItemCount(this.itemId);
        this.updateCount();
    }

    minusClick(){
        // @ts-ignore
        this.decItemCount(this.itemId);
        this.updateCount();
    }

    plusClick(){
        // @ts-ignore
        this.incItemCount(this.itemId);
        this.updateCount();
    }

    updateCount(){
        // @ts-ignore
        this.count = this.pos.itemsCount[this.itemId];
    }

    mounted(){
        this.updateCount();
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
button.root{
    width: 44%;
    height: 0;
    padding: 9% 0 13% 0;
    position: relative;
    margin: 1%;
    font-size: 1.2rem;
}
button.blue > span{
    position: relative;
    top: -1.3rem;
}
div{
    margin-top: -0.45rem;
}
div > button.ctrl{
    width: 33%;
    height: 3rem;
    color: white;
    font-weight: bold;
    border: none;
    background-color: lighten($blue, 10);
    outline: none;
    &:active{
        background-color: darken($blue, 20);
    }
    &:nth-child(1){
        float: left;
        border-bottom-left-radius: 0.3rem;
    }
    &:nth-child(3){
        float: right;
        border-bottom-right-radius: 0.3rem;
    }
}
</style>
