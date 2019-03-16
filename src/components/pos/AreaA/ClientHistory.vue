<template>
    <div>
        Client History...
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ClientHistory extends Vue{
    @Prop({default: () => []}) items!: any[];

}
</script>

