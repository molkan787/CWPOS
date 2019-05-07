const LEFT = 'left';
const RIGHT = 'right';
const CENTER = 'center';

class POSReceiptBuilder {

	lineLength: number;
	priceLength: number;
	quantityLength: number;
	nameLength: number;
	tPriceLength: number;
	tNameLength: number;

	spaceChar: string;
	separatorChar: string;

	addedSepAfterItems!: boolean;
	lines!: string[];


	constructor(options?: any){
		const _options = options || {};

		this.lineLength = _options.lineLength || 44;
		this.priceLength = _options.priceLength || 7;
		this.quantityLength = _options.quantityLength || 3;
		this.nameLength = this.lineLength - this.priceLength - this.quantityLength - 2;

		this.tPriceLength = this.priceLength + 3;
		this.tNameLength = this.lineLength - this.tPriceLength - 1;

		this.spaceChar = ' ';
		this.separatorChar = '-';
		this.clear();
	}

	clear(){
		this.lines = [];
		this.addedSepAfterItems = false;
	}

	getLines(){
		return [...this.lines];
	}

	getString(){
		return this.lines.join("\n");
	}

	// ===========================================

	addHeader(data: any, doNotCenterTitle?: boolean){
		this._emptyLine();
		this._line('RECEIPT', doNotCenterTitle ? false : CENTER);
		this._emptyLine();
		this._line(data.title, doNotCenterTitle ? false : CENTER);
		this._emptyLine();

		this._line(`Order ID: ${data.orderId}`);
		this._line(`Date: ${data.date}`);
		this._line(`Cashier: ${data.cashier}`);
		this._emptyLine();
		this._item({name: 'ITEM', q: 'QTY', price: 'PRICE'});
		this._separator();

	}

	addItem(item: any){
		this._item({
			name: item.name,
			q: this._qty(item.q),
			price: this._price(item.price),
		});
	}

	addTotalsItem(item: any){
		let line = '';
		line += this._block(item.name, this.tNameLength, RIGHT);
		line += this.spaceChar;
		line += this._block(this._price(item.amount), this.tPriceLength, RIGHT);

		if(!this.addedSepAfterItems || item.isFinal){
			this._separator();
			this.addedSepAfterItems = true;
		}

		this._line(line);

		if(item.isFinal){
			this._separator();
			this._emptyLine();
		}
	}

	// ===========================================

	_item(item: any){
		let line = '';
		line += this._block(item.name, this.nameLength);
		line += this.spaceChar;
		line += this._block(item.q, this.quantityLength);
		line += this.spaceChar;
		line += this._block(item.price, this.priceLength, RIGHT);

		this._line(line);
	}

	_block(text: string, size: number, align?: any){
		const spacesCount = size - text.length;
		if(spacesCount == 0){
			return text;
		}else if(spacesCount < 0){
			return text.substring(0, size);
		}

		if(align == RIGHT){
			return this._getSpaces(spacesCount) + text;
		}else if(align == CENTER){
			const rp = Math.round(spacesCount / 2);
			const lp = spacesCount - rp;
			return this._getSpaces(lp) + text + this._getSpaces(rp);
		}else{ // Default align 'left'
			return text + this._getSpaces(spacesCount);
		}
	}

	_getSpaces(n: number){
		return this.spaceChar.repeat(n);
	}

	_separator(){
		this._line(this.separatorChar.repeat(this.lineLength));
	}

	_emptyLine(){
		this.lines.push('');
	}

	_line(line: string, align?: any){
		if(typeof align == 'boolean' && !align){
			this.lines.push(line);
		}else{
			const block = this._block(line, this.lineLength, align);
			this.lines.push(block);
		}
	}

	// ------------------------------------------

	_price(value: any){
		let val = parseFloat(value);
		if(val >= 0){
			return '$' + val.toFixed(2);
		}else{
			val *= -1;
			return '- $' + val.toFixed(2);
		}
	}

	_qty(q: number){
		return q ? 'x' + q : '';
	}
}

export default POSReceiptBuilder;