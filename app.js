const _tokens = {
	1: 'I',
	5: 'V',
	10: 'X',
 	50: 'L',
	100: 'C',
	500: 'D',
	1000: 'M',
}

const _macron = String.fromCodePoint('773');

let cache = {};

const getTokens = max => {

	if(!cache.tokens) cache.tokens = Object.assign({},_tokens);
	if(!cache.tokenKeys) cache.tokenKeys = Object.keys(_tokens);

	let {tokens, tokenKeys} = cache;

	while(max > tokenKeys[tokenKeys.length -1]) {
		let dimension = Math.ceil(tokenKeys.length/Object.keys(_tokens).length)*3
		Object.keys(_tokens).map((key,index) => {
			if(index > 0) {
				tokens[key*Math.pow(10,dimension)] = _tokens[key]+(Array(dimension/3-1).join(_macron));
			}
		})
		tokenKeys = Object.keys(tokens);
	}
	if(tokens !== cache.tokens) {
		cache.tokens = tokens;
		cache.tokenKeys = tokenKeys;
	}
	return {
		tokens: tokens,
		tokenKeys: tokenKeys
	}

}

const convert = number => {

	number = parseFloat(number);

	let rt = '';
	let originalNumber = number;

	let { tokens, tokenKeys } = getTokens(number);

	for(let i = tokenKeys.length - 1; i >= 0; i--) {

		if(number <= 0) {
			break;
		}

		let current = {
			token: tokens[tokenKeys[i]],
			key: tokenKeys[i]
		}
		let next = {
			token: tokens[tokenKeys[i+1]],
			key: tokenKeys[i+1]
		}
		let prev = {
			token: tokens[tokenKeys[i-1]],
			key: tokenKeys[i-1]
		}
		let prevPrev = {
			token: tokens[tokenKeys[i-2]],
			key: tokenKeys[i-2]
		}

		let numberBlockCount = Math.floor(number/current.key);
		if(numberBlockCount > 0) {
			rt += Array(numberBlockCount+1).join(current.token);
			number = number % current.key;
		}

		let prevPrevNumberBlockCount = Math.floor(number/(current.key-prevPrev.key));
		let prevNumberBlockCount = Math.floor(number/(current.key-prev.key));

		console.log(current.token, number, numberBlockCount,prevPrevNumberBlockCount,prevNumberBlockCount);
		if(prevPrevNumberBlockCount > 0) {
			rt += Array(prevPrevNumberBlockCount-numberBlockCount+1).join(prevPrev.token);
			rt += current.token;
			number = number % prevPrev.key;
		}
		else if(prevNumberBlockCount > 0) {
			rt += Array(prevNumberBlockCount-numberBlockCount+1).join(prev.token);
			rt += current.token;
			number = number % prev.key;
		}

	}
	console.log(rt);

};


[1,2,3,4,5,6,7,8,9,10].map(n => {
	convert(n);
});
