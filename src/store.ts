import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      {
        id: '1',
        name: 'IN OUT WASHES'
      },{
        id: '2',
        name: 'OUT ONLY OR IN ONLY'
      },{
        id: '3',
        name: 'TOP UPS'
      }
    ],
    products: {
      '1': [
        { name: 'CAR', id: '1', price: 18 },
        { name: 'SM SUV', id: '2', price: 20 },
        { name: 'LG SUV', id: '3', price: 22 },
        { name: 'TRUCK', id: '4', price: 25 },
      ]
    },

    // ======================
    pos: {
      total: 34.6,
      items: [

      ]
    },

    stats: {
      cw: 45,
      pp: 17,
      rpp: 32,
      dt: 24
    }
  },
  getters: {
    getCategory(state){
      return (catID: string) => state.categories.filter(category => category.id == catID)[0];
    }
  },
  mutations: {
    POS_ADD_ITEM: (state, item) => {
      // @ts-ignore
      state.pos.items.unshift(item);
    }
  },
  actions: {
    AddPOSItem(context, item){
      context.commit('POS_ADD_ITEM', item);
    }
  },
});
