<template>
    <div class="root">
        <h2>Download Reports</h2>
        <hr>
        <sui-segment>
            <h3>Daily Reports</h3>
            <hr>
            <LabeledInput label="Day" type="date" v-model="day"/>
            <sui-button icon="download">Download</sui-button>
        </sui-segment>
        <sui-segment>
            <h3>Date Range Reports</h3>
            <hr>
            <LabeledInput label="Date from" type="date" v-model="date_from"/>
            <LabeledInput label="Date to" type="date" v-model="date_to"/>
            <sui-button icon="download">Download</sui-button>
        </sui-segment>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LabeledInput from '../Elts/inputs/LabeledInput.vue';

@Component({
    components: {
        LabeledInput,
    }
})
export default class ReportsTab extends Vue{
    private day: any = '';
    private date_from: any = '';
    private date_to: any = '';

}
</script>

<style lang="scss" scoped>
.segment{
    text-align: left;
}
hr{
    margin-bottom: 1rem;
}
</style>
