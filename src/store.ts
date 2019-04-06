import Vue from 'vue';
import Vuex from 'vuex';
import Comu from './prs/comu';
import things from './prs/things';
import Utils from './utils';
import consts from './prs/consts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTime: '00:00',

    categories: [],
    products: {},
    productsByIds: {},
    productsArray: [],

    data: {
      orders: [],
      clients: [],
      prepaid: [],
      loyalty: [],
      users: [],
    },
    dataState: {},
    filtersState: {
      orders: {},
      clients: {},
      prepaid: {},
      loyalty: {},
    },

    //=======================
    pos: {
      values: {
        fullDiscount: false,
        itemsTotal: 0,
        discount: 0,
        extraCharge: 0,
        tips: 0,
        subTotal: 0,
        taxGST: 0,
        taxQST: 0,
        total: 0,
        paidCash: 0,
        changeDue: 0
      },
      items: [],
      itemsCount: {},
      pay_method: 'cash',
      paid: false,
      finished: false,
    },
    payment: {},
    ticket: '',
    nextOrderId: 0,

    postingOrder: false,
    //=======================
    client: {
      id: 0,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      want_receipt: false,
      history: []
    },

    user: {
      id: 0,
      user_type: 100000,
      username: '',
    },

    companies: [],

    stats: {cw: 0, pp: 0,  rpp: 0, dt: 0},

    areaAView: 'order',
  },
  getters: {
    getCategory(state){
      // @ts-ignore
      return (catID: string) => state.categories.filter(category => category.id == catID)[0];
    },
    pos: state => state.pos,
    userType: state => state.user.user_type,
  },
  actions: {
    setup(context){
      Comu.setup(context);
    },

    setTicket({state}, val){
      state.ticket = val;
    },

    addProduct({state}, data: any){
        const id = data.id;
        const cat = data.category_id;

        Vue.set(state.productsByIds, id, data);
        // @ts-ignore
        state.productsArray.push(data);
        // @ts-ignore
        if(!state.products[cat]){
          Vue.set(state.products, cat, []);
        }
        // @ts-ignore
        state.products[cat].push(data);
    },

    setData({state}, payload: any){
      Vue.set(state.data, payload.name, payload.data);
      Vue.set(state.dataState, payload.name, true);
    },

    setClientId(context, clientId){
      // @ts-ignore
      let clientData: any = context.state.companies.filter(item => item.id == clientId);
      if(clientData.length) clientData = clientData[0];
      else clientData = null;

      const client = context.state.client;
      client.id = clientId;
      if(clientData){
        context.dispatch('setClientData', clientData);
      }
    },

    setClientData(context, clientData: any){
      const client = context.state.client;
      if(clientData){
        client.id = clientData.id;
        client.first_name = clientData.first_name;
        client.last_name = clientData.last_name;
        client.phone = clientData.phone;
        client.email = clientData.email;
        client.want_receipt = clientData.want_receipt;
        client.history = clientData.history;
      }
    },

    endOrderPosting(context){
      context.state.postingOrder = false;
      if (context.state.pos.finished) Comu.reset();
    },
    markAsPaid(context){
      context.state.pos.paid = true;
    },
    markAsFinished(context){
      context.state.pos.finished = true;
    },
    resetPOS(context){
      const pos = context.state.pos;
      const values = pos.values;
      pos.items = [];
      pos.itemsCount = {};
      pos.pay_method = 'cash';
      pos.paid = false;
      pos.finished = false;
      values.fullDiscount = false;
      values.itemsTotal = 0;
      values.discount = 0;
      values.extraCharge = 0;
      values.tips = 0;
      values.subTotal = 0;
      values.taxGST = 0;
      values.taxQST = 0;
      values.total = 0;
      values.paidCash = 0;
      values.changeDue = 0;

      // Reseting Products dynamic properties
      const items = context.state.productsArray;
      for(let i = 0; i < items.length; i++){
        const item: any = items[i];
        if(item.product_type == 2){
          item.price = 0;
          item.addTaxes = false;
        }
      }
      context.state.payment = {};
      context.state.ticket = '';

      const client = context.state.client;
      client.id = 0;
      client.first_name = '';
      client.last_name = '';
      client.phone = '';
      client.email = '';
      client.want_receipt = false;
      client.history = [];

      context.state.areaAView = 'order';
    },

    setItemCountOne(context, itemId){
      setItemCount(context, itemId, 1, true);
    },
    incItemCount(context, itemId){
      setItemCount(context, itemId, 1, false);
    },
    decItemCount(context, itemId){
      setItemCount(context, itemId, -1, false);
    },
    setCustomPriceItem(context, {itemId, price, taxesIncluded}){
      // @ts-ignore
      const item = context.state.productsByIds[itemId];
      Vue.set(item, 'addTaxes', !taxesIncluded);
      if(price > 0){
        Vue.set(item, 'price', price);
        setItemCount(context, itemId, 1, true);
      }else{
        Vue.set(item, 'price', 0);
        setItemCount(context, itemId, 0, true);
      }
    },
    addCustomItem(context, itemData){
      // @ts-ignore
      context.state.productsByIds[itemData.id] = itemData;
      setItemCount(context, itemData.id, 1, true);
    },

    // POS Values
    setTips(context, value){
      context.state.pos.values.tips = value;
      context.dispatch('updateValues');
    },
    setExtraCharge(context, value){
      context.state.pos.values.extraCharge = value;
      context.dispatch('updateValues');
    },
    setDiscount(context, value){
      const values = context.state.pos.values;
      if(value == 'full'){
        values.discount = -values.itemsTotal;
        values.fullDiscount = true;
      }else{
        values.discount = parseFloat(value) * -1;
        values.fullDiscount = false;
      }
      context.dispatch('updateValues');
    },
    setPaidCash(context, value){
      context.state.pos.values.paidCash = value;
      context.dispatch('updateValues');
    },
    updateValues({state}){
      const {values, items, itemsCount} = state.pos;
      let total = 0;
      let totalExludingTaxes = 0;
      let extraGst = 0;
      let extraQst = 0;
      for(let i = 0; i < items.length; i++){
        const item: any = items[i];
        // @ts-ignore
        const ltotal = item.price * itemsCount[item.id];
        if(item.product_type == consts.productWithoutTaxesType){
          totalExludingTaxes += ltotal;
        }else if(item.addTaxes){
          extraGst += ltotal * things.taxes.gst;
          extraQst += ltotal * things.taxes.qst;
          totalExludingTaxes += ltotal;
        }else{
          total += ltotal;
        }
      }
      total += values.extraCharge;

      values.itemsTotal = total + values.tips + extraGst + extraQst + totalExludingTaxes;
      if(values.fullDiscount){
        values.discount = -values.itemsTotal;
      }

      total += values.discount;

      const gst = total * things.taxes.gst;
      const qst = total * things.taxes.qst;
      const subTotal = total - gst - qst + totalExludingTaxes;

      values.subTotal = subTotal;
      values.taxGST = gst + extraGst;
      values.taxQST = qst + extraQst;
      values.total = total + values.tips + extraGst + extraQst + totalExludingTaxes;
      values.changeDue = Utils.round(values.paidCash - values.total);
    },

    // View state
    setAreaAView({state}, viewName: string){
      if(state.areaAView !== viewName){
        state.areaAView = viewName;
      }
    }
  },
});

function setItemCount(context: any, itemId: number, amount: number, forceAmount: boolean){
  const itemsCount = context.state.pos.itemsCount;
  const product = context.state.productsByIds[itemId];
  const items = context.state.pos.items;
  
  let count = itemsCount[itemId];
  if(forceAmount) count = 0;

  if(count) count += amount;
  else count = amount;
  if(count < 0) count = 0;
  else if(count > 10) count = 10;

  Vue.set(itemsCount, itemId, count);

  const itemIndex = items.indexOf(product);

  if(itemsCount[itemId] > 0){
    if(itemIndex == -1) items.unshift(product);
  }else if(itemIndex !== -1){
    items.splice(itemIndex, 1);
  }

  context.dispatch('updateValues');
  context.dispatch('setAreaAView', 'order');
}