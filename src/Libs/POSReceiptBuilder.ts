const LEFT = 'left';
const RIGHT = 'right';
const CENTER = 'center';

class POSReceiptBuilder {

	lineLength: number;
	totalLength: number;
	priceLength: number;
	quantityLength: number;
	nameLength: number;
	tPriceLength: number;
	tNameLength: number;

	spaceChar: string;
	separatorChar: string;
	fontSize!: {
		x: number,
		y: number
	};

	addedSepAfterItems!: boolean;
	lines!: {
		font: {
			x: number,
			y: number
		},
		text: string
	}[];


	constructor(options?: any){
		const _options = options || {};

		this.lineLength = _options.lineLength || 44;
		this.totalLength = _options.totalLength || 8;
		this.priceLength = _options.priceLength || 7;
		this.quantityLength = _options.quantityLength || 3;
		this.nameLength = this.lineLength - this.totalLength - this.priceLength - this.quantityLength - 3;

		this.tPriceLength = this.priceLength + 3;
		this.tNameLength = 25;

		this.spaceChar = ' ';
		this.separatorChar = '*';
		this.fontSize = {
			x: 1,
			y: 1
		};
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
		this._fontBig();
		this._separator(21);
		this._line(data.title, doNotCenterTitle ? false : CENTER);

		this._fontNormal();
		for(let st of data.subtitles){
			this._line(st, doNotCenterTitle ? false : CENTER);
			this._separator(25);
		}
		this._emptyLine();

		this._line(`Commande ID: ${data.orderId}`);
		this._line(`Date: ${data.date}`);
		this._line(`Commis: ${data.cashier}`);
		this._emptyLine();
		this._item({name: 'ITEM', q: 'QTE', price: 'PRIX', total: 'TOTAL'});
		this._underline();

	}

	addItem(item: any){
		this._item({
			name: item.name,
			q: this._qty(item.q),
			price: this._price(item.price),
			total: this._price(item.price * item.q)
		});
	}

	addTotalsItem(item: any){
		this._fontNormal();
		const lp = item.leftPadding('     ');
		let line = '';
		line += this._block(item.name + ':', this.tNameLength, LEFT);
		line += this.spaceChar;
		line += this._block(this._price(item.amount), this.tPriceLength, RIGHT);

		if(!this.addedSepAfterItems){
			this._emptyLine();
			this.addedSepAfterItems = true;
		}

		this._line(line, RIGHT);

		if(item.isFinal){
			this._separator();
			this._emptyLine();
		}
	}

	addNormalMessage(text: string, prependSapce?: boolean, prependSep?: boolean){
		this._fontNormal();
		this._addMessage(text, prependSapce, prependSep);
	}
	
	addBigMessage(text: string, prependSapce?: boolean, prependSep?: boolean){
		this._fontBig();
		this._addMessage(text, prependSapce, prependSep);
	}

	addSeparator(fontSize?: number, prependSapce?: boolean){
		if(prependSapce) this._emptyLine();
		if(fontSize == 2) this._fontBig(); else this._fontNormal();
		this._separator(34);
	}

	addSpace(fontSize?: number, prependSep?: boolean){
		if(prependSep) this.addSeparator(fontSize);
		this._emptyLine();
	}

	// ===========================================

	_fontNormal(){
		this.fontSize.x = 1;
		this.fontSize.y = 1;
	}

	_fontBig(){
		this.fontSize.x = 2;
		this.fontSize.y = 2;
	}

	
	_addMessage(text: string, prependSapce?: boolean, prependSep?: boolean){
		if(prependSapce) this._emptyLine();
		if(prependSep) this._separator(34);
		this._line(text, false);
	}

	_item(item: any){
		let line = '';
		line += this._block(item.name, this.nameLength);
		line += this.spaceChar;
		line += this._block(item.q, this.quantityLength);
		line += this.spaceChar;
		line += this._block(item.price, this.priceLength, RIGHT);
		line += this.spaceChar;
		line += this._block(item.total, this.totalLength, RIGHT);

		this._fontNormal();
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

	_separator(w?: number){
		this._line(this.separatorChar.repeat(w || this.lineLength), w ? false : CENTER);
	}

	_underline(){
		let line = '';
		let str = this.lines[this.lines.length-1].text;
		for(let chr of str){
			line += chr == ' ' ? ' ' : this.separatorChar; 
		}
		this._line(line, false);
	}

	_emptyLine(){
		this._line('', false);
	}

	_line(line: string, align?: any){
		let str;
		if(typeof align == 'boolean' && !align){
			str = line;
		}else{
			const block = this._block(line, this.lineLength, align);
			str = block;
		}
		this.lines.push({
			font: {...this.fontSize},
			text: str,
		});
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