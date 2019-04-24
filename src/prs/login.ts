import axios from 'axios';
import _url from './api';
import Vue from 'vue';

export default class Login{
    private static context: any;
    private static comu: any;

    static setup(context: any, comu: any){
        this.context = context;
        this.comu = comu;
    }

    static login(username: string, password: string){
        return new Promise((resolve, reject) => {
            const data = {username, password};
            axios.post(_url('auth'), data).then(({data}) => {
                if(data.status == 'OK'){
                    this.setUser(data);
                    this.comu.loadData().then(() => {
                        resolve(true);
                    }).catch((error: any) => {
                        reject(error);
                    });
                }else{
                    reject(data.cause)
                }
            }).catch(error => {
                console.log(error);
                reject(error);
            });
        });
    }

    public static setUser(data: any){
        const user = data.user;
        // this.context.state.user.id = user.id;
        this.context.state.user.username = user.username;
        this.context.state.user.user_type = user.user_type;
        Vue.set(this.context.state.user, 'id', user.id);
        this.comu.setToken(data.token);
    }
}