<template>
    <div>
        <sui-button class="item" v-for="(item, index) in items" :key="index"
        @click="AddPOSItem(item)" >
            {{ item.name }}
        </sui-button>
        <div v-if="items.length == 0" class="empty-text">This Category is empty</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Component({
    computed: {
        ...mapState(['products'])
    },
    methods: {
        ...mapActions(['AddPOSItem'])
    }
})
export default class Category extends Vue{
    @Prop({default: ''}) catID!: string;

    private items: any[] = [];

    mounted(){
        // @ts-ignore
        const prts = this.products[this.catID];
        this.items = prts || [];
    }

    itemClick(pid: string){

    }

}
</script>

<style lang="scss" scoped>
.item{
    width: 44%;
    height: 0;
    padding: 9% 0 13% 0;
    position: relative;
    margin: 1%;
    font-size: 1.2rem;
}
div.empty-text{
    padding-top: 3.7rem;
    font-style: italic;
    text-align: center;
    font-size: 1.5rem;
    color: #aaa;
}
</style>
