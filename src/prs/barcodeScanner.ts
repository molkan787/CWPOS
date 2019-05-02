import BarcodeScannerDriver from '@/drivers/barcodeScanner';

export default class BarcodeScanner{

    private static noBindHandler: Function;
    private static bindedHandler: any;


    static init(){
        BarcodeScannerDriver.setHandler((barcode: string) => {
            this.scanned(barcode);
        });
    }

    private static scanned(barcode: string){
        if(this.bindedHandler){
            this.bindedHandler(barcode);
        }else if(this.noBindHandler){
            this.noBindHandler(barcode);
        }
    }

    public static setNoBindHandler(handler: Function){
        this.noBindHandler = handler;
    }

    public static bind(handler: Function){
        this.bindedHandler = handler;
    }

    public static unBind(){
        this.bindedHandler = null;
    }

}

BarcodeScanner.init();