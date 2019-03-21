<template>
  <sui-modal v-model="value" :animationDuration="300" size="tiny" :closable="false">
      <sui-modal-header v-if="title">{{ title }}</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
          <slot></slot>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions v-if="!hideActions" class="modal-buttons">
        <sui-button v-if="defaultButton" positive @click.native="hide">
          OK
        </sui-button>
        <slot name="buttons"></slot>
      </sui-modal-actions>
      <sui-dimmer :active="loading" inverted>
        <div class="ui loader"></div>
      </sui-dimmer>
    </sui-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class Modal extends Vue{

    @Prop({default: false}) value!: boolean;
    @Prop({default: ''}) title!: string;
    @Prop({default: false}) defaultButton!: boolean;
    @Prop({default: false}) hideActions!: boolean;
    @Prop({default: false}) loading!: boolean;

    hide() {
      this.$emit('input', false);
    }
}
</script>

<style>
.modal-buttons > button{
  font-size: 1.2rem !important;
}
</style>
