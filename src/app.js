const getTokens = require('./lib/getTokens.js');



const getToken = (
	number,
	index
) => {

	let { tokens, tokenKeys } = getTokens(number);
	return {
		character: tokens[tokenKeys[index]],
		key: tokenKeys[index]
	};

};



const getNumberForTokenDigitConvo = ({
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



const getNumberForPosition = ({
	number,
	index,
	initialNumber
}) => {

	let rt = '';

	let token = getToken(number,index);
	let digits = initialNumber?
		Math.floor(number/(initialNumber.token.key-token.key)):
		Math.floor(number/token.key);

	if(digits > 0) {
		rt += getNumberForTokenDigitConvo({
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

	let returnable = '';
	let { tokenKeys } = getTokens(number);

	for(let i = tokenKeys.length - 1; i >= 0; i--) {

		if(number <= 0) {
			break;
		}

		let initialNumber = getNumberForPosition({
			number: number,
			index: i
		});
		let backpropagationCandidates = [i-1,i-2];

		number = initialNumber.number;
		returnable += initialNumber.text;

		backpropagationCandidates.map(candidateIndex => {

			let candidate = getNumberForPosition({
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

	return returnable;

};



module.exports = convert;
