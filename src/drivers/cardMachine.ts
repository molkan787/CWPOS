export default class CardMachine{

    private static waitingForResponse: boolean = false;
    private static resolveFunction: Function;

    static setup(){
        // TODO
        // Connect to Card Machine Service...
    }

    static reset(){
        this.waitingForResponse = false;
        this.resolveFunction = () => {};
    }

    static cancel(){
        this.reset();
        this.cancelTransaction();
    }

    static request(payload: any){
        return new Promise((resolve, reject) => {
            this.sendTransactionRequest(payload.amount).then(status => {
                // Send status like: Card Machine is ready to use for card payment.
                payload.callback(status);
            }).catch(error => {
                reject(error);
            });
            // Store resolve function, It will be called once Card Machine Service reply.
            this.resolveFunction = resolve;
            this.waitingForResponse = true;
        });
    }

    private static sendTransactionRequest(amount: any){
        return new Promise((resolve, reject) => {
            // TODO
            // Send transaction request to Card Machine Service

            // TMP
            setTimeout(() => {
                resolve('READY');
            }, 1500);
            setTimeout(() => {
                this.onServiceMessage('accepted');
            }, 6000);
        });
    }

    // Here goes the reply from Card Machine Service -- TODO
    private static onServiceMessage(message: string){
        if(!this.waitingForResponse) return;
        // Check if we got positive response from the service
        if(message == 'accepted'){
            this.resolveFunction(true);
        }else{
            this.resolveFunction(false);
        }
        this.reset();
    }

    private static cancelTransaction(){
        // Send request to Card Machine Service to cancel the transaction -- TODO
    }

}