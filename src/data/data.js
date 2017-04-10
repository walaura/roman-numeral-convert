const tokens = {
	1: 'I',
	5: 'V',
	10: 'X',
	50: 'L',
	100: 'C',
	500: 'D',
	1000: 'M',
};

const zero = 'N';

const exponent = 3;
const exponentFn = (pow,token) => {
	/*switch to non unicode macrons to on huge numbers to avoid crashing*/
	const macron = (pow > 3)?'¯':String.fromCodePoint('773');
	return token.character+(Array(pow+1).join(macron));
}

const joinNumberFn = (number) => {
	return number.join('');
}

module.exports = {
	tokens: tokens,
	exponent: exponent,
	exponentFn: exponentFn,
	joinNumberFn: joinNumberFn,
	zero: zero
};
