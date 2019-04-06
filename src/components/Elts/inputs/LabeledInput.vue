<template>
    <div class="root ui labeled input">
        <label class="ui label">{{label}}</label>
        <input :disabled="disabled" :type="type" v-model="pvalue" @change="change" :placeholder="ph || label"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class LabeledInput extends Vue{

    @Prop({default: null}) resetBus!: Vue;

    @Prop({default: 'text'}) type!: string;

    @Prop({default: ''}) label!: string;
    @Prop({default: ''}) ph!: string;

    @Prop({default: null}) value!: any;

    @Prop({default: false}) disabled!: boolean;

    private pvalue: any = '';

    change(){
        this.$emit('input', this.pvalue);
    }

    updateValue(){
        this.pvalue = this.value;
    }

    mounted(){
        this.updateValue();
    }

    created(){
        if(this.resetBus){
            this.resetBus.$on('reset', () => {
                this.pvalue = null;
                this.change();
            });
        }
    }

}
</script>

<style lang="scss" scoped>
div.root{
    display: inline-block;
    height: 2.7rem;
    margin: 0 0.2rem;
    label{
        float: left;
        height: 100%;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    input{
        height: 100% !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}
</style>
