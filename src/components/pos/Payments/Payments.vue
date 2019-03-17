<template>
    <div>
        <h2>Total: {{ total | price }}</h2>
        <h3>
            <span class="sub-s">Amount: ${{ paid }}</span>
            <span class="second sub-s">
                Change:
                <span :class="{
                    positive: change > 0,
                    negative: change < 0
                }">{{ change | price }} </span>
            </span>
        </h3>
        <ButtonsGrid @buttonClick="buttonClicked" class="buttonsGrid" :buttons="cashButtons" />
        <KeyPad @keyPressed="changePaid" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import KeyPad from '../../Elts/KeyPad.vue';
import ButtonsGrid from '../../Elts/ButtonsGrid.vue';

@Component({
    components: {
        KeyPad,
        ButtonsGrid,
    }
})
export default class Payments extends Vue{
    private total: number = 43.5;
    private paid: string = '50.5';
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
        if(key == '!') this.paid = '';
        else this.paid = key;
    }

    changePaid(key: string){
        this.paid = this.mutateNumber(this.paid, key, 8, 2);
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
            padding-left: 3rem;
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
