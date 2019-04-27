<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <CustomValueModal />
    <PrepaidCardModal />
    <LoyaltyCardModal />
    <MessageModal />
    <InActiveModal />
    <OptionsModal />
    <ClientModal />
    <ReasonModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions} from 'vuex';
import CustomValueModal from './components/Helpers/CustomValueModal.vue';
import PrepaidCardModal from './components/pre/PrepaidCardModal.vue';
import LoyaltyCardModal from './components/pre/LoyaltyCardModal.vue';
import MessageModal from './components/pre/MessageModal.vue';
import InActiveModal from './components/pre/InActiveModal.vue';
import OptionsModal from './components/pre/OptionsModal.vue';
import ClientModal from './components/pre/ClientModal.vue';
import ReasonModal from './components/pre/ReasonModal.vue';

export default Vue.extend({
  components: {
    CustomValueModal,
    PrepaidCardModal,
    LoyaltyCardModal,
    MessageModal,
    InActiveModal,
    OptionsModal,
    ClientModal,
    ReasonModal,
  },
  methods: {
    ...mapActions(['setup'])
  },

  created(){
    this.setup();
  }
});
</script>


<style lang="scss">
@import '@/scss/vars.scss';
@import '@/scss/global.scss';
body{
  padding: 0;
  margin: 0;
  padding-top: $navbar-h;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  position: fixed;
  z-index: 1000;
  top: 0; left: 0;
  width: 100%;
  height: $navbar-h;
  padding: 10px;
  box-sizing: border-box;
  background-color: #fafafa;
  box-shadow: 0 0 6px #999;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
