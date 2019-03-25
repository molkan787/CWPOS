<template>
    <div>
        <sui-button class="item" v-for="(category, index) in categories" :key="index"
        @click="itemClick(category.id)" >
            {{ category.name }}
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

    itemClick(id: any){
        this.$emit('catSelected', id);
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


