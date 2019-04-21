<template>
    <Modal v-model="open" :title="title" :loading="loading" :dialog="dialog" @dialogAnswer="dialogAnswer" >

        <ClientInfoForm :data="formData" />

        <template v-slot:buttons>
            <button class="ui button" @click="cancel">CANCEL</button>
            <button class="ui green button" @click="save">SAVE</button>
        </template>
    </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Modal from '../Elts/Modal.vue';
import MxHelper from '@/prs/MxHelper';
import ModalDialog from '@/ccs/ModalDialog';
import DM from '@/prs/dm';
import ClientInfoForm from './ClientInfoForm.vue';

@Component({
    components: {
        Modal,
        ClientInfoForm,
    }
})
export default class ClientModal extends Vue{
    private open: boolean = false;
    private loading: boolean = false;
    private title: string = '';
    private dialog = new ModalDialog();

    private callback!: Function;

    private clientId!: any;
    private formData: any = {
        phone: '',
        email: '',
        first_name: '',
        last_name: ''
    };

    save(){
        if(this.validateForm()){
            this.loading = true;
            const clientData = {id: this.clientId, ...this.formData};
            DM.editClient(clientData).then((data: any) => {
                if(this.callback) this.callback(data);
                this.open = false;
            }).catch(error => {
                this.dialog.show('We could not complete current action.');
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    cancel(){
        this.open = false;
        if(this.callback) this.callback(false);
    }

    loadClient(payload: any){
        const id = payload.id;
        this.clientId = id;
        if(id == 'new'){
            this.title = 'Add new client';
            this.setFormData({});
        }else{
            this.title = 'Client id: ' + id;
            this.loading = true;
            this.setFormData({});
            DM.getClientData({id}).then((data: any) => {
                this.setFormData(data);
            }).catch(error => {
                this.dialog.show('We could not load client data.', 1, 'loading_error');
            }).finally(() => {
                this.loading = false;
            });
        }
    }

    setFormData(data: any){
        const fd = this.formData;
        fd.phone = data.phone || '';
        fd.email = data.email || '';
        fd.first_name = data.first_name || '';
        fd.last_name = data.last_name || '';
    }
    
    validateForm(){
        const d = this.formData;
        if(d.phone.length != 10 || d.first_name.length < 2){
            this.dialog.show('Please enter a valid Phone number and First name');
        }else{
            return true;
        }
        return false;
    }

    dialogAnswer(){
        if(this.dialog.ref == 'loading_error'){
            this.open = false;
        }
    }

    created(){
        MxHelper.registerFunction('editClient', (payload: any) => new Promise((resolve, reject) => {
            this.callback = resolve;
            this.loadClient(payload);
            this.open = true;
        }));

    }

}
</script>
