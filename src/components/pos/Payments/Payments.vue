<template>
    <div>
        <h2>Total: {{ pos.values.total | price }}</h2>
        <h3>
            <span class="sub-s">Amount: ${{ paid }}</span>
            <span class="second sub-s">
                Change:
                <span :class="{
                    positive: pos.values.changeDue > 0,
                    negative: pos.values.changeDue < 0
                }">{{ pos.values.changeDue | price }} </span>
            </span>
        </h3>
        <ButtonsGrid @buttonClick="buttonClicked" class="buttonsGrid" :buttons="cashButtons" />
        <KeyPad @keyPressed="changePaid" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {mapState, mapActions} from 'vuex';
import KeyPad from '../../Elts/KeyPad.vue';
import ButtonsGrid from '../../Elts/ButtonsGrid.vue';

@Component({
    components: {
        KeyPad,
        ButtonsGrid,
    },
    computed: {
        ...mapState(['pos'])
    },
    methods: {
        ...mapActions(['setPaidCash'])
    }
})
export default class Payments extends Vue{
    private paid: string = '';
    private change: number = 7;

    private cashButtons = [
        {text: '$ 10', key: '10'},
        {text: '$ 20', key: '20'},
        {text: '$ 30', key: '30'},
        {text: '$ 40', key: '40'},
        {text: '$ 50', key: '50'},
        {text: '$ 100', key: '100'},
        {text: 'Exact', key: '='},
        {text: 'Clear', key: '!'},
    ];

    buttonClicked(key: string){
        if(key == '!'){
            this.paid = '';
        }else if(key == '='){
            // @ts-ignore
            this.paid = this.pos.values.total + '';
        }else{
            this.paid = key;
        }
        this.pushPaidAmount();
    }

    changePaid(key: string){
        this.paid = this.mutateNumber(this.paid, key, 8, 2);
        this.pushPaidAmount();
    }

    pushPaidAmount(){
        // @ts-ignore
        this.setPaidCash(parseFloat(this.paid || 0));
    }

    mutateNumber(val: string, key: string, limit: number, decimalLimit: number){
        if(typeof limit == 'number' && val.length >= limit && key != '<') return val;
        if(typeof decimalLimit == 'number' && key != '<'){
            let parts = val.split('.');
            if(parts.length > 1 && parts[1].length >= decimalLimit) return val;
        }

        if(key == '<'){
            val = val.substr(0, val.length - 1);
        }else if (key == '.'){
            if(val.indexOf('.') == -1){
                if(val.length == 0) val += '0';
                val += '.';
            }
        }else{
            if(val.charAt(0) == '0' && val.charAt(1) != '.'){
                val = '';
            }
            val += key;
        }
        return val;
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
h2{
    margin-bottom: 0;
}
h3{
    margin-top: 1rem;
    font-size: 1.4rem;
    span.sub-s{
        text-align: left;
        display: inline-block;
        width: 50%;
        padding-left: 1rem;
        &.second{
            padding-left: 2rem;
        }
        span{
            &.positive{
            color: $green;
            }
            &.negative{
                color: $red;
            }
        }
    }
}
.buttonsGrid{
    margin-top: 1.5rem !important;
    margin-bottom: 1rem !important;
}
</style>
