const getTokens = require('./lib/getTokens.js');

const getNumberForDigits = ({
	initial,
	current
}) => {

	let rt = '';

	if(!initial) {
		rt += Array(current.digits+1).join(current.token.character);
	}
	else if(parseInt(initial.token.key - current.token.key * current.digits-initial.digits) === parseInt(current.token.key)) {
		rt += current.token.character;
	}
	else {
		rt += Array(current.digits-initial.digits+1).join(current.token.character);
		rt += initial.token.character;
	}
	return rt;

};

const getToken = (number,index) => {

	let { tokens, tokenKeys } = getTokens(number);
	return {
		character: tokens[tokenKeys[index]],
		key: tokenKeys[index]
	};

};

const getNumberForPosition = ({number,index,initialNumber}) => {

	let rt = '';

	let token = getToken(number,index);
	let digits = initialNumber?
		Math.floor(number/(initialNumber.token.key-token.key)):
		Math.floor(number/token.key);

	if(digits > 0) {
		rt += getNumberForDigits({
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

const convert = number => {

	number = parseInt(number);

	let rt = '';
	let { tokenKeys } = getTokens(number);

	for(let i = tokenKeys.length - 1; i >= 0; i--) {

		if(number <= 0) {
			break;
		}

		let initialNumber = getNumberForPosition({
			number: number,
			index: i
		});

		number = initialNumber.number;
		rt += initialNumber.text;

		let prevPrevNumber = getNumberForPosition({
			number: number,
			index: i-2,
			initialNumber: initialNumber
		});
		let prevNumber = getNumberForPosition({
			number: number,
			index: i-1,
			initialNumber: initialNumber
		});

		if(prevPrevNumber.digits > 0 && Math.log10(prevPrevNumber.token.key)%1 === 0) {
			number = prevPrevNumber.number;
			rt += prevPrevNumber.text;
		}
		else if(prevNumber.digits > 0) {
			number = prevNumber.number;
			rt += prevNumber.text;
		}

	}

	return rt;

};

console.log(convert(494));

module.exports = convert;
