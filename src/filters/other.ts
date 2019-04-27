export default {
    joinnames: (person: any) => `${person.first_name} ${person.last_name}`,
    yesIfTrue: (val: any) => val ? 'Yes' : '',
    pol_barcode: (card: any) => {
        if(card && card.barcode && typeof card.barcode == 'string'){
            return card.barcode;
        }
        return '---';
    },
    phone: (num: string) => {
        let result = '';
        for(let i = 0; i < num.length && i < 10; i++){
            if(i == 3 || i == 6)
                result += '-';
            result += num.charAt(i);
        }
        return result;
    },
    orderTicket: (obj: any) => {
        return obj.ticket;
    }
}

// extractRawNumber(val: string){
//     return val.replace(/[^0-9]/g, '');
// }