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

		let rt = '';

		if(!initial) {
			rt += Array(current.digits+1).join(current.token.character);
		}
		else if(parseInt(initial.token.key - current.token.key * current.digits-initial.digits) === parseInt(current.token.key)) {
			rt += current.token.character;
		}
		else {
			rt += Array(current.digits+1).join(current.token.character);
			rt += initial.token.character;
		}
		return rt;

	};



	getNumberForPosition({
		number,
		index,
		initialNumber
	}){

		let rt = '';

		let token = this.getToken(number,index);
		let digits = initialNumber?
			Math.floor(number/(initialNumber.token.key-token.key)):
			Math.floor(number/token.key);

		if(digits > 0) {
			rt += this.getNumberForTokenDigitConvo({
				current: {
					token: token,
					digits: digits
				},
				initial: initialNumber?{
					token: initialNumber.token,
					digits: initialNumber.digits
				}:undefined
			});
			number = number % token.key;
		}

		return {
			token: token,
			digits: digits,
			number: number,
			text: rt
		};

	};



	toString() {

		return this.number;

	}



	constructor(number,customData={}){

		number = parseInt(number);
		if(isNaN(number)) number = 0;

		this.data = Object.assign({},defaultData,customData);

		let negative = number < 0;
		let returnable = '';
		let { tokenKeys } = getTokens(number,this.data);

		if(number === 0) {
			return data.zero;
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
			returnable += initialNumber.text;

			backpropagationCandidates.map(candidateIndex => {

				let candidate = this.getNumberForPosition({
					number: number,
					index: candidateIndex,
					initialNumber: initialNumber
				});
				if(candidate.digits > 0 && Math.log10(candidate.token.key)%1 === 0) {
					number = candidate.number;
					returnable += candidate.text;
				}

			});

		}

		this.number = (negative?'-':'')+returnable;

	};

}
