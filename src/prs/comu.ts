import axios from 'axios';

const ApiBaseURI = 'http://localhost:8080/';
function _url(path:string){
  return ApiBaseURI + path;
}

export default class Comu{

    private static context: any;

    static setup(context: any){
        this.context = context;
        this.loadData();
    }

    static loadData(){
        axios.get(_url('asd')).then(response => {
            this.context.state.categories = response.data.categories;
            this.context.state.products = response.data.products;
            this.context.state.productsByIds = response.data.productsByIds;
            this.context.state.stats = response.data.stats;
  
        });
    }

    static postOrder(){
        const state = this.context.state;
        const data = {
            client_id: state.client.id
        };
    }
}