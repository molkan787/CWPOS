<template>
    <div class="root">
        <sui-segment class="central">
            <div class="header">
                <img src="@/assets/logo.png">
                <h1>APOS</h1>
            </div>
            
            <div class="ui form">
                <div class="field">
                    <label>Username</label>
                    <input v-model="username" type="text" placeholder="Username">
                </div>
                <div class="field">
                    <label>Last Name</label>
                    <input v-model="password" type="password" placeholder="Password">
                </div>
                <button class="ui button" @click="loginClick">
                    <i class="unlock icon"></i>
                    Login
                </button>
            </div>
            <sui-dimmer :active="loading" inverted>
                <div class="ui loader"></div>
            </sui-dimmer>
        </sui-segment>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Message from '../../ccs/Message';
import LoginService from '@/prs/login';

@Component
export default class Login extends Vue{
    private loading: boolean = false;
    private username: string = '';
    private password: string = '';

    loginClick(){
        if(this.username.length < 5){
            Message.info('Please type a valid username.').then((e: any) => e.hide());
        }else if(this.password.length < 4){
            Message.info('Please type a valid password.').then((e: any) => e.hide());
        }else{
            this.loading = true;
            this.login();
        }
    }

    login(){
        LoginService.login(this.username, this.password).then(() => {
            // this.username = '';
            this.password = '';
            this.$router.push('pos');
            // @ts-ignore
            Inac.reset();
        }).catch(error => {
            Message.info('Wrong combination of Username & Password.').then((e: any) => e.hide());
        }).finally(() => {
            this.loading = false;
        });
    }
}
</script>

<style lang="scss" scoped>
$w: 40rem;
$h: 30rem;
.central{
    position: fixed !important;
    top: 50%;
    left: 50%;
    width: $w;
    height: $h;
    margin-top: $h / -2 !important;
    margin-left: $w / -2;
    padding: 0 !important;
    background-color: #f9f9f9;
}
.header{
    width: 100%;
    height: 10rem;
    text-align: center;
    img{
        height: 100%;
    }
    h1{
        margin: 0;
        font-size: 2rem;
        margin-top: -2.5rem;
        background-color: rgba(73,155,234,1);
        background: -webkit-linear-gradient(45deg, rgba(51,102,150,1) 0%, rgba(114,29,135,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.form{
    padding: 2rem;
    font-size: 1.2rem !important;
    label, button{
        font-size: 1.2rem !important;
    }
    button{
        width: 100%;
    }
}
</style>
