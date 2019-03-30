<template>
    <div>
        <h2>Categories</h2>
        <hr>
        <sui-button class="item" @click="itemClick('+')" >
            <sui-icon name="plus circle"></sui-icon>
        </sui-button>
        <sui-button class="item" v-for="(category, index) in categories" :key="index"
        @click="itemClick(category.id)" :class="category.id == cat ? 'blue': ''">
            {{ category.name }}
            <sui-icon name="right chevron" v-if="category.id == cat"></sui-icon>
        </sui-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState} from 'vuex';

@Component({
    computed: {
        ...mapState(['categories'])
    }
})
export default class Categories extends Vue{

    private cat = -1;

    itemClick(id: any){
        this.cat = id;
        this.$emit('change', id);
    }

}
</script>

<style lang="scss" scoped>
.item{
    width: 100%;
    margin-bottom: 0.3rem;
    font-size: 1.3rem;
}
</style>


