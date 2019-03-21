export default class{
    
    static requestPayment(method: string, amount: number){
        switch (method) {
            case 'cash':
                return this._Cash(amount);
            case 'card':
                return this._DebitCard(amount);
            case 'prepaid':
                return this._PrepaidCard(amount);
            case 'loyalty':
                return this._LoyaltyCard(amount);
            case 'invoice_ari':
                return this._Invoice(amount);
            default:
                return this._Other(amount);
        }
    }

    private static _Cash(amount: number){
        // Open cash drawer...
    }

    private static _DebitCard(amount: number){
        // Send amount to Credit/Debit Card Machine
    }

    private static _PrepaidCard(amount: number){
        // Send request to server
    }

    private static _LoyaltyCard(amount: number){
        // Send request to server
    }

    private static _Invoice(amount: number){
        // idk what to do
    }

    private static _Other(amount: number){
        // Imidiatly approve the payment 
    }

}