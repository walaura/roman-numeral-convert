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
		rt += Array(current.digits+1).join(current.token.character);
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

		let backpropagationCandidates = [
			getNumberForPosition({
				number: number,
				index: i-2,
				initialNumber: initialNumber
			}),
			getNumberForPosition({
				number: number,
				index: i-1,
				initialNumber: initialNumber
			})
		];

		backpropagationCandidates.map(candidate => {
			if(candidate.digits > 0 && Math.log10(candidate.token.key)%1 === 0) {
				number = candidate.number;
				rt += candidate.text;
			}
		})

	}

	return rt;

};

module.exports = convert;
