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
const macron = String.fromCodePoint('773');

module.exports = {
	tokens: tokens,
	macron: macron,
	zero: zero
};
