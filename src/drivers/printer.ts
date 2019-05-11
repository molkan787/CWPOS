class Printer{

    static device: any;
    static printer: any;

    static setup(){
        // @ts-ignore
        const escpos = imp('escpos');
        const device  = new escpos.USB();
        const options = { encoding: "GB18030" };

        this.device = device;
        this.printer = new escpos.Printer(device, options);

    }

    static print(str: string){

        const lines = str.split("\n");

        this.device.open(() => {
            this.printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1);

            for (let i = 0; i < lines.length; i++) {
                this.printer.text(lines[i]);
            }
            
            this.printer.cut();
            this.printer.close();
        });
        
    }

    static openCashDrawer(){

        this.device.open(() => {
            console.log('Opening Cashdrawer...');
            this.printer.cashdraw(5);
            this.printer.cashdraw(2);
            this.printer.close();
        });

    }

}

// @ts-ignore
window.printer = Printer;
export default Printer;