<template>
    <div>
        <Header />
        <Body />
        <ProductModal />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Header from './Header.vue';
import Body from './Body.vue';
import ProductModal from '../pre/ProductModal.vue';

@Component({
    components: {
        Header,
        Body,
        ProductModal,
    }
})
export default class Admin extends Vue{

}
</script>
