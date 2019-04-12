// @ts-ignore
// const escpos:any = imp('escpos');

export default class Receipt{

    static context: any;
    static device: any;
    static printer: any;
    static ready: boolean = false;

    static setup(context: any){
        // this.context = context;
        // this.device = new escpos.USB();
        // this.printer = new escpos.Printer(this.device, {});
        // this.device.open(() => {
        //     this.ready = true;
        // });
    }

    static print(){
        // const printer = this.printer;
        // this.device.open(function(){
        //     printer
        //     .font('a')
        //     .align('ct')
        //     .style('bu')
        //     .size(1, 1)
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     .text('     ')
        //     // @ts-ignore
        //     this.cut();
        //     // @ts-ignore
        //     this.close();
        // });
    }

}