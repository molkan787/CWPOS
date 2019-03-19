<template>
    <div>
        {{ text }} <label v-if="label">{{ label }}</label>
        <span>{{ amount | price }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class OrderItem extends Vue{

    @Prop({default: ''}) text!: string;
    @Prop({default: ''}) label!: string;
    @Prop({default: 0}) amount!: number;

}
</script>

<style lang="scss" scoped>
div{
    width: 100%;
    height: 2rem;
    padding: 0.5rem 0.5rem 1.8rem 0.5rem;
    font-size: 1.3rem;
    border-bottom: 1px solid #ccc;
    background-color: #f5f5f5;
}
span{
    float: right;
}
label{
    opacity: 0.8;
    font-size: 0.8em;
}
</style>
