<template>
    <Modal v-model="open" title="Options">
        <h3>Zoom</h3>
        <div class="zoom-con">
            <sui-button class="m-btn" icon="minus" @click="minus"></sui-button>
            <div class="zoomValue ui disabled input">
                <input type="text" :value="zoom + '%'">
            </div>
            <sui-button class="p-btn" icon="plus" @click="plus"></sui-button>
        </div>
        <template v-slot:buttons>
            <sui-button @click="close">Close</sui-button>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '../Elts/Modal.vue';
import Component from 'vue-class-component';
import MxHelper from '@/prs/MxHelper';

@Component({
    components: {
        Modal,
    }
})
export default class OptionsModal extends Vue{
    private open: boolean = false;

    private zoom: number = 100;

    minus(){
        this.adjustZoom(-10);
    }
    plus(){
        this.adjustZoom(10);
    }

    adjustZoom(amt: any){
        this.zoom += amt;
        if(this.zoom < 50) this.zoom = 50;
        else if(this.zoom > 150) this.zoom = 150;

        const fontSize = Math.round((this.zoom / 100) * 14);
        // @ts-ignore
        document.body.parentElement.style.fontSize = fontSize + 'px';
    }


    close(){
        this.open = false;
    }

    created(){
        MxHelper.registerFunction('openOptions', () => {
            this.open = true;
        });
    }

}
</script>

<style scoped lang="scss">
.zoom-con{
    height: 4rem;
}
.zoomValue{
    opacity: 1 !important;
    font-size: 1.2rem !important;
    input{
        text-align: center !important;
        font-weight: bold;
        border-radius: 0;
        width: 200px;
    }
}
.m-btn, .p-btn, .zoomValue{
    margin: 0 !important;
    height: 3rem !important;
    float: left;
}
.m-btn{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.p-btn{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>