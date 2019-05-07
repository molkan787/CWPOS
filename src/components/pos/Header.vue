<template>
    <div class="m-el">
        <img src="@/assets/logo.png">
        <span class="bis">
            <sui-icon name="clock"/> <strong>{{currentTime}}</strong> <br>
            <sui-icon name="user circle"/> <strong class="">{{user.username}}</strong>
            <sui-label class="logout-btn" icon="power off" @click="logout">Logout</sui-label>
        </span>
        <div class="right-side">
            <sui-button compact icon="search" @click="searchClient" />
            <PhoneInput v-model="phone" placeholder="Telephone" icon="phone" iconPosition="left" />
            <sui-input :value="ticket" @input="updateTicket" placeholder="Ticket #" icon="ticket" iconPosition="left" />
        </div>
        <div v-if="message.visible" class="ui icon message">
            <i :class="message.icon"></i>
            <div class="content">
                <div class="header">
                    {{ message.text }}
                </div>
            </div>
        </div>
        <div v-if="message2.visible" class="ui icon message message2" :class="message2.color">
            <i :class="message2.icon"></i>
            <div class="content">
                <div class="header">
                    {{ message2.text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import Utils from '@/utils';
import comu from '@/prs/comu';
import Message from '@/ccs/Message';
import barcodeScanner from '@/prs/barcodeScanner';
import ClientLoader from '@/prs/clientLoader';
import PhoneInput from '../pre/PhoneInput.vue';

@Component({
    components: {
        PhoneInput,
    },
    computed: mapState(['user', 'currentTime', 'ticket', 'loyaltyCard']),
    methods: mapActions(['setTicket']),
    watch: {
        loyaltyCard: {
            // @ts-ignore
            handler: function (){ this.updateLoyaltyBarcode() },
            deep: true,
        }
    },
})
export default class Header extends Vue {
    private message = {
        visible: false,
        status: '',
        text: '',
        icon: '',
        color: '',
        timeout: 0,
    };
    private message2 = {
        visible: false,
        status: '',
        text: '',
        icon: '',
        color: '',
        timeout: 0,
    };

    updateTicket(val: any){
        // @ts-ignore
        this.setTicket(val);
    }

    private phone: string = '';

    searchClient(){
        if(this.phone.length != 10){
            if(this.phone.length > 0) this.setMessageContent(1, 'invalid_number', true);
            return;
        }
        this.setMessageContent(1, 'fetching');
        ClientLoader.loadClient(this.phone).then(() => {
            this.setMessageContent(1, 'found', true);
            this.phone = '';
        }).catch(error => {
            console.log(error);
            this.setMessageContent(1, error, true);
        });
    }

    searchLoyaltyCard(barcode: string){
        this.setMessageContent(2, 'fetching_card');
        ClientLoader.loadLoyaltyCard(barcode).catch(error => {
            this.setMessageContent(2, error, true);
        });
    }

    setMessageContent(msgId: number, status: string, autoHide?: boolean){
        const msg = msgId == 1 ? this.message : this.message2;
        msg.status = status;
        if(status == 'fetching'){
            msg.text = 'Fetching data...';
            msg.icon = 'notched circle loading icon';
        }else if(status == 'fetching_card'){
            msg.text = 'Loading loyalty card...';
            msg.icon = 'notched circle loading icon';
            msg.color = '';
        }else if(status == 'found'){
            msg.text = 'Client history loaded';
            msg.icon = 'circle check outline icon';
        }else if(status == 'NOT_FOUND'){
            msg.text = (msgId == 1 ? 'Client' : 'Loyalty card') + ' not found';
            msg.icon = 'ban icon';
        }else if(status == 'invalid_number'){
            msg.text = 'Invalid phone number';
            msg.icon = 'warning circle icon';
        }else{
            msg.text = 'An error occured';
            msg.icon = 'close circle icon';
        }
        if(msg.timeout) clearTimeout(msg.timeout);
        msg.visible = true;
        if(autoHide) this.hideMessage(msg);
    }

    updateLoyaltyBarcode(){
        // @ts-ignore
        const barcode = this.loyaltyCard.barcode;
        const msg = this.message2;
        if(barcode){
            msg.status = 'data';
            msg.text = 'Loyalty-' + barcode;
            msg.icon = 'icon ticket alternate';
            msg.color = 'blue';
            if(msg.timeout) clearTimeout(msg.timeout);
            msg.visible = true;
        }else if(msg.status == 'data'){
            msg.visible = false;
        }
    }

    hideMessage(msg: any){
        msg.timeout = setTimeout(() => {
            msg.visible = false;
        }, 4000);
    }

    // ========================================

    logout(){
        Message.ask('Are you sure you want to logout ?').then((e: any) => {
            e.hide();
            if(e.answer){
                console.log('Logging out...')
                comu.setToken('');
                this.$router.push('/');
                // @ts-ignore
                Inac.stop();
            }
        });
    }

    created(){
        barcodeScanner.setNoBindHandler((barcode: string) => this.searchLoyaltyCard(barcode));
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
div.message{
    display: inline-block !important;
    width: 250px !important;
    height: 3rem !important;
    float: right !important;
    padding: 0.8rem !important;
    margin-left: -100%;
    text-align: left;
    i{
        float: left;
        zoom: 0.5;
        margin-left: 0.2rem;
    }
    div.header{
        line-height: 1.5;
    }
}
.message2{
    position: relative !important;
    top: 38%;
    left: 0;
}
</style>
