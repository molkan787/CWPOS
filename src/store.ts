import Vue from 'vue';
import Vuex from 'vuex';
import Comu from './prs/comu';
import things from './prs/things';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: {},
    productsByIds: {},

    // ======================
    pos: {
      values: {
        fullDiscount: false,
        itemsTotal: 0,
        discount: 0,
        subTotal: 0,
        taxGST: 0,
        taxQST: 0,
        total: 0,
        paidCash: 0,
        changeDue: 0
      },
      items: [],
      itemsCount: {},
      pay_method: '',
    },

    client: {
      id: 42
    },

    stats: {cw: 0, pp: 0,  rpp: 0, dt: 0}
  },
  getters: {
    getCategory(state){
      // @ts-ignore
      return (catID: string) => state.categories.filter(category => category.id == catID)[0];
    }
  },
  actions: {
    setup(context){
      Comu.setup(context);
    },

    incItemCount(context, itemId){
      setItemCount(context, itemId, 1);
    },
    decItemCount(context, itemId){
      setItemCount(context, itemId, -1);
    },

    // POS Values
    setDiscount(context, value){
      const values = context.state.pos.values;
      if(value == 'full'){
        values.discount = -values.itemsTotal;
        values.fullDiscount = true;
      }else{
        values.discount = -value;
        values.fullDiscount = false;
      }
      context.dispatch('updateValues');
    },
    setTotal(context, value){
      context.state.pos.values.total = value;
      context.dispatch('updateValues');
    },
    setPaidCash(context, value){
      context.state.pos.values.paidCash = value;
      context.dispatch('updateValues');
    },
    updateValues({state}){
      const {values, items, itemsCount} = state.pos;
      let total = 0;
      for(let i = 0; i < items.length; i++){
        const item = items[i];
        // @ts-ignore
        total += item.price * itemsCount[item.id];
      }
      if(values.fullDiscount){
        values.discount = -total;
      }
      values.itemsTotal = total;
      total += values.discount;

      const gst = total * things.taxes.gst;
      const qst = total * things.taxes.qst;
      const subTotal = total - gst - qst;

      values.subTotal = subTotal;
      values.taxGST = gst;
      values.taxQST = qst;
      values.total = total;
      values.changeDue = values.paidCash - values.total;
    }
  },
});

function setItemCount(context: any, itemId: number, amount: number){
  const itemsCount = context.state.pos.itemsCount;
  const product = context.state.productsByIds[itemId];
  const items = context.state.pos.items;
  
  if(itemsCount[itemId]) itemsCount[itemId] += amount;
  else itemsCount[itemId] = amount;
  if(itemsCount[itemId] < 0) itemsCount[itemId] = 0;
  else if(itemsCount[itemId] > 10) itemsCount[itemId] = 10;

  const itemIndex = items.indexOf(product);

  if(itemsCount[itemId] > 0){
    if(itemIndex == -1) items.unshift(product);
  }else if(itemIndex !== -1){
    items.splice(itemIndex, 1);
  }

  // context.commit('POS_ADD_ITEM', product);
  context.dispatch('setTotal', product.price);
}