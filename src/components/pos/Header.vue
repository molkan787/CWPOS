<template>
    <div class="m-el">
        <img src="@/assets/logo.png">
        <span class="bis">
            <sui-icon name="clock"/> <strong>{{currentTime}}</strong> <br>
            <sui-icon name="user circle"/> <strong class="">{{user.username}}</strong>
            <sui-label class="logout-btn" icon="power off">Logout</sui-label>
        </span>
        <div class="right-side">
            <sui-button compact icon="search" />
            <sui-input placeholder="Telephone" icon="phone" iconPosition="left" />
            <sui-input placeholder="Ticket #" icon="ticket" iconPosition="left" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Utils from '@/utils';

@Component({
    computed: mapState(['user']),
})
export default class Header extends Vue {
    public currentTime = '00:00';

    private interval: any;

    updateTime(){
        this.currentTime = Utils.getCurrentTime();
    }

    mounted(){
        this.updateTime();
        this.interval = setInterval(() => {
            this.updateTime();
        }, 15000);
    }

    beforeDestroy(){
        if(this.interval){
            clearInterval(this.interval);
        }
    }
}
</script>

<style lang="scss" scoped>
$root-h: 8rem;

div.m-el{
    height: $root-h;
    border-bottom: 1px solid #bbb;
    img{
        height: 100%;
        float: left;
    }
}
.bis{
    float: left;
    line-height: 1.5;
    text-align: left;
    font-size: 1.3rem;
    margin-top: $root-h * 0.25;
}
.right-side{
    width: 20.5rem;
    float: right;
    padding: 1rem;
    margin-right: 1rem;
    button{
        float: right;
        width: 2.7rem;
        height: 2.7rem;
    }
    div{
        float: left;
        margin-bottom: 6px;
    }
}
.logout-btn{
    margin-left: 1rem;
}
</style>
