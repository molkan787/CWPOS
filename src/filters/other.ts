export default {
    joinnames: (person: any) => `${person.first_name} ${person.last_name}`,
    yesIfTrue: (val: any) => val ? 'Yes' : '',
    pol_barcode: (card: any) => {
        if(card && card.barcode && typeof card.barcode == 'string'){
            return card.barcode;
        }
        return '---';
    }
}