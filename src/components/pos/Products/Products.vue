<template>
    <div class="root">
        <div class="header">
            <sui-icon v-if="catID != 'all'" name="arrow left" class="backBtn" @click="goBack" />
            {{ headerText }}
        </div>
        <Categories v-if="catID == 'all'" @catSelected="categorySelected" />
        <Category v-if="catID != 'all'" :catID="catID"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapGetters} from 'vuex';
import Component from 'vue-class-component';
import Categories from './Categories.vue';
import Category from './Category.vue';

@Component({
    components: {
        Categories,
        Category
    },
    computed: {
        ...mapGetters(['getCategory'])
    }
})
export default class Products extends Vue{

    private headerText = 'Categories';
    private catID: string = 'all';

    categorySelected(cat_id: any){
        this.catID = cat_id;
        // @ts-ignore
        let cat = this.getCategory(cat_id);
        this.headerText = cat.name;
    }

    goBack(){
        this.headerText = 'Categories';
        this.catID = 'all';
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
$header-h: 2.6rem;
div.root{
    padding-top: $header-h !important;
}
.header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-h;
    padding: 0.5rem;
    background-color: $grey;
    font-size: 1.2rem;
}
.backBtn{
    float: left;
    margin-left: 0.3rem;
    margin-right: -100px;
}
</style>
