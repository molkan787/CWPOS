class Printer{

    static ready: boolean = false;
    static printer: any;

    static setup(){
        // @ts-ignore
        const escpos = imp('escpos');
        const device  = new escpos.USB();
        const options = { encoding: "GB18030" };

        this.printer = new escpos.Printer(device, options);

        this.ready = false;
        device.open(() => {
            this.ready = true;
        });
    }

    static print(str: string){
        if(!this.ready) return;

        const lines = str.split("\n");
        this.printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1);

        for (let i = 0; i < lines.length; i++) {
            this.printer.text(lines[i]);
        }
        
        this.printer.cut();
        
    }

    static openCashDrawer(){
        if(!this.ready) return;

        this.printer.cashdraw(27);
    }

}

// @ts-ignore
window.printer = Printer;
export default Printer;