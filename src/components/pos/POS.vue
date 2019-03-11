<template>
    <div class="page">
        <Header />
        {{title}}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';

@Component({
    components: {
        Header
    },
})
export default class Home extends Vue {
    public title = 'Hello Title !!!';
}
</script>

<style lang="scss" scoped>
@import '@/scss/vars.scss';

</style>
