import Vue from 'vue';

// price: function (value: any){
//   let val = parseFloat(value);
//   if(val < 0)
//       return '- $' + (-val).toFixed(2);
//   else
//       return '$' + val.toFixed(2);
// }
Vue.filter("price", (value: any) => '$' + parseFloat(value).toFixed(2));