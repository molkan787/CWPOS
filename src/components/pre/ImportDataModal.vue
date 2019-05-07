<template>
    <Modal v-model="open" :title="title" :dialog="dialog" @dialogAnswer="dialogAnswer">
        
        <h3>Excel file:</h3>
        <FileInput :bus="bus" v-model="file" :disabled="loading"/>

        <template v-slot:buttons>
            <sui-button @click="cancel">CANCEL</sui-button>
            <sui-button @click="okClick" color="green" :loading="loading">Import</sui-button>
        </template>

    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MxHelper from '@/prs/MxHelper';
import DM from '@/prs/dm';
import Modal from '../Elts/Modal.vue';
import FileInput from '../Elts/inputs/FileInput.vue';
import ModalDialog from '@/ccs/ModalDialog';
import utils from '../../utils';

@Component({
    components: {
        Modal,
        FileInput,
    }
})
export default class DataImportModal extends Vue{

    private open: boolean = false;
    private loading: boolean = false;
    private dialog = new ModalDialog();
    private bus = new Vue();

    private file: File = null;

    private title: string = 'Import Prepaid Cards';

    private payload!: any;

    private resolve!: Function;
    private reject!: Function;

    okClick(){
        if(this.validateForm()){
            this.loading = true;
            DM.sendFile({file: this.file, dest: this.payload.dest}).then(() => {
                this.dialog.show('Data was successfully imported!', 1, 'success');
            }).catch(err => {
                this.dialog.show('We could not complete the current action');
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    cancel(){
        this.open = false;
        this.reject('CANCELED');
    }

    validateForm(){
        if(!this.file){
            this.dialog.show('Please select a file');
        }else if(utils.getFilenameExtension(this.file.name) != 'xlsx'){
            this.dialog.show('Please select an Excel file');
        }else{
            return true;
        }
        return false;
    }

    handle(payload: any){
        this.payload = payload;
        this.resetForm();

        this.title = payload.title || 'Import Data';

        this.open = true;
    }

    resetForm(){
        this.bus.$emit('reset');
        this.loading = false;
    }

    dialogAnswer(answer: string){
        if(answer == 'OK' && this.dialog.ref == 'success'){
            this.open = false;
        }
    }

    created(){
        // @ts-ignore
        MxHelper.registerFunction('openDataImportWizard', (payload: any) => {
            return new Promise((resolve, reject) => {
                this.handle(payload);
                this.resolve = resolve;
                this.reject = reject;
            });
        });
    }

}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';
h2{
    margin-top: 0;
}
hr{
    margin: 1.4rem 0 1rem 0;
}
.change-label{
    font-size: 1.3rem;
    margin-left: 1rem;
    &.positive{
        color: $green;
    }
    &.negative{
        color: $red;
    }
}
</style>

