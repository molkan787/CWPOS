export default class MxHelper{
    
    private static customValueModal: any;



    static getCustomValue(params: any){
        return this.callHandler(this.customValueModal, params);
    }

    private static callHandler(component: any, params: any){
        return new Promise((resolve, reject) => {
            component.resolve = resolve;
            component.reject = reject;
            component.handle(params);
        });
    }

    // Components registration
    static registerComponent(name: string, component: any){
        switch (name) {
            case 'CustomValueModal':
                this.customValueModal = component;
                break;
        
            default:
                break;
        }
    }

}