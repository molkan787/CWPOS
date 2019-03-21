<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/pos">POS</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <CustomValueModal />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions} from 'vuex';
import CustomValueModal from './components/Helpers/CustomValueModal.vue';

export default Vue.extend({
  components: {
    CustomValueModal
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
