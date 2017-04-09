const getTokens = require('./lib/getTokens.js');

const getNumberForDigits = ({digits,current,shortDigits,previous}) => {

	let rt = '';

	if(!previous) {
		rt += Array(digits+1).join(current.character);
	}
	else if(parseInt(current.key - previous.key * shortDigits-digits) === parseInt(previous.key)) {
		rt += previous.character;
	}
	else {
		rt += Array(shortDigits-digits+1).join(previous.character);
		rt += current.character;
	}
	return rt;

}

const getToken = (number,index) => {

	let { tokens, tokenKeys } = getTokens(number);
	return {
		character: tokens[tokenKeys[index]],
		key: tokenKeys[index]
	}

}

const getNumberForPosition = ({number,index,initialNumber}) => {

	let rt = '';

	let token = getToken(number,index);
	let digits = initialNumber?
		Math.floor(number/(initialNumber.token.key-token.key)):
		Math.floor(number/token.key);

	if(digits > 0) {
		rt += getNumberForDigits({
			shortDigits: initialNumber? digits: undefined,
			previous: initialNumber? token: undefined,
			digits: initialNumber? initialNumber.digits : digits,
			current: initialNumber? initialNumber.token : token
		})
		number = number % token.key;
	}

	return {
		token: token,
		digits: digits,
		number: number,
		text: rt
	};

}

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

		if(prevPrevNumber.digits > 0) {
			number = prevPrevNumber.number;
			rt += prevPrevNumber.text;
		}
		else if(prevNumber.digits > 0) {
			number = prevNumber.number;
			rt += prevNumber.text;
		}

	}
	console.log(rt);

};


[1,2,3,4,5,6,7,8,9,10].map(n => {
	convert(n);
});
