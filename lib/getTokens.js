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

module.exports = getTokens = max => {

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
