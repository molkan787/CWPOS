import price from './price';

export default {
    install(Vue: any) {
        Vue.filter('price', price);
    }
}