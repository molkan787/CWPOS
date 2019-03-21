import things from './things';

export default class Utils{
    
    static mutateNumber(val: string, key: string, limit: number, decimalLimit: number){
        if(typeof limit == 'number' && val.length >= limit && key != '<') return val;
        if(typeof decimalLimit == 'number' && key != '<'){
            let parts = val.split('.');
            if(parts.length > 1 && parts[1].length >= decimalLimit) return val;
        }

        if(key == '<'){
            val = val.substr(0, val.length - 1);
        }else if (key == '.'){
            if(val.indexOf('.') == -1){
                if(val.length == 0) val += '0';
                val += '.';
            }
        }else{
            if(val.charAt(0) == '0' && val.charAt(1) != '.'){
                val = '';
            }
            val += key;
        }
        return val;
    }

    static addTaxes(value: number){
        const taxes = things.taxes.gst + things.taxes.qst;
        return value * (1 + taxes);
    }

}