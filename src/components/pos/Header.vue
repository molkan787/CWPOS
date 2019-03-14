<template>
    <div class="m-el">
        <img src="@/assets/logo.png">
        <span class="bis">
            Current time: <strong>{{currentTime}}</strong> <br>
            Logged in User: <strong class="">{{currentUser}}</strong>
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

@Component({
})
export default class Header extends Vue {
    public currentTime = '20:47';
    public currentUser = 'Marshmello';
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
