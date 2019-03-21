<template>
    <div class="page">
        <Header />
        <CBody />
        <PaymentModal />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import CBody from './CBody.vue';
import PaymentModal from './Elements/PaymentModal.vue';

@Component({
    components: {
        Header,
        CBody,
        PaymentModal,
    },
})
export default class Home extends Vue {
    
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';

</style>
