<template>
    <div class="root">
        <h3>Daily Count</h3>
        <hr>
        <label>
            <sui-icon name="car"/> <br>
            CW: <span>{{ stats.cw }}</span>
        </label>
        <label>
            <sui-icon name="plus square"/> <br>
            PP: <span>{{ stats.pp }}</span>
        </label>
        <label>
            <sui-icon name="sync"/> <br>
            RPP: <span>{{ stats.rpp }}</span>
        </label>
        <label>
            <sui-icon name="setting"/> <br>
            DT: <span>{{ stats.dt }}</span>
        </label>

        <br>
        
        <sui-button icon="setting" @click="goToAdmin" :disabled="userType >= 5">Admin Panel</sui-button>
        <sui-button icon="chart bar" :disabled="userType >= 5">Daily Reports</sui-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState, mapGetters} from 'vuex';

@Component({
    computed: {
        ...mapState(['stats']),
        ...mapGetters(['userType']),
    }
})
export default class Stats extends Vue{
    goToAdmin(){
        this.$router.push('admin');
    }
}
</script>

<style lang="scss" scoped>
hr{
    margin-bottom: 1.2rem;
}
label{
    display: inline-block;
    width: 25%;
    font-size: 1.4rem;
    span{
        font-weight: bold;
    }
    i{
        margin: 0.7rem 0;
    }
}
button{
    font-size: 1.1rem !important;
    margin-top: 1.2rem !important;
}
</style>

