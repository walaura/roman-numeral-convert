const getTokens = require('./lib/getTokens');
const defaultData = require('./data/data');


module.exports = class {

	getToken(
		number,
		index
	) {

		let { tokens, tokenKeys } = getTokens(number,this.data);
		return {
			character: tokens[tokenKeys[index]],
			key: tokenKeys[index]
		};

	};



	getNumberForTokenDigitConvo({
		initial,
		current
	}){

		let rt = [];
		if(!initial) {
			rt = rt.concat(Array(current.digits+1).join(current.token.character+' ').split(' '));
		}
		else if(parseInt(initial.token.key - current.token.key * current.digits-initial.digits) === parseInt(current.token.key)) {
			rt = rt.concat(current.token.character);
		}
		else {
			rt = rt.concat(Array(current.digits+1).join(current.token.character+' ').split(' '));
			rt = rt.concat(initial.token.character);
		}

		return rt;

	};



	getNumberForPosition({
		number,
		index,
		initialNumber
	}){

		let rt = [];

		let token = this.getToken(number,index);
		let digits = initialNumber?
			Math.floor(number/(initialNumber.token.key-token.key)):
			Math.floor(number/token.key);

		if(digits > 0) {
			rt = rt.concat(this.getNumberForTokenDigitConvo({
				current: {
					token: token,
					digits: digits
				},
				initial: initialNumber?{
					token: initialNumber.token,
					digits: initialNumber.digits
				}:undefined
			}));
			number = number % token.key;
		}
		return {
			token: token,
			digits: digits,
			number: number,
			text: rt
		};

	};



	convert(number) {

		number = parseInt(number);
		if(isNaN(number)) number = 0;

		let negative = number < 0;
		let returnable = [];
		let { tokenKeys } = getTokens(number,this.data);

		if(number === 0) {
 			return [this.data.zero];
		}

		if(negative) {
			number = number*-1;
		}

		for(let i = tokenKeys.length - 1; i >= 0; i--) {

			if(number <= 0) {
				break;
			}

			let initialNumber = this.getNumberForPosition({
				number: number,
				index: i
			});
			let backpropagationCandidates = [i-1,i-2];

			number = initialNumber.number;
			returnable = returnable.concat(initialNumber.text);

			backpropagationCandidates.map(candidateIndex => {

				let candidate = this.getNumberForPosition({
					number: number,
					index: candidateIndex,
					initialNumber: initialNumber
				});
				if(candidate.digits > 0 && Math.log10(candidate.token.key)%1 === 0) {
					number = candidate.number;
					returnable = returnable.concat(candidate.text);
				}

			});

		}

		returnable = returnable.filter(value => value.length > 0);
		negative?returnable.unshift('-'):null;

 		return returnable;

	}



	constructor(number,customData={}){

		this.data = Object.assign({},defaultData,customData);
		this._number = this.convert(number);

	};



	get number() {

		return this.data.joinNumberFn(this._number);

	}



	toString() {

		return this.number;

	}

}
