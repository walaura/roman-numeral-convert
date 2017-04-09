const defaultData = require('../data/data');

let cache = {};

module.exports = (max=0,customData={}) => {

	let data = Object.assign({},defaultData,customData);

	if(JSON.stringify(data) !== JSON.stringify(cache.data)) {
		cache = {};
	}

	if(!cache.tokens) cache.tokens = Object.assign({},data.tokens);
	if(!cache.tokenKeys) cache.tokenKeys = Object.keys(data.tokens);

	let {tokens, tokenKeys} = cache;

	while(max > tokenKeys[tokenKeys.length -1]) {
		let dimension = Math.ceil(tokenKeys.length/Object.keys(data.tokens).length)*3;
		Object.keys(data.tokens).map((key,index) => {
			if(index > 0) {
				tokens[key*Math.pow(10,dimension)] = data.tokens[key]+(Array(dimension/3-1).join(data.macron));
			}
		});
		tokenKeys = Object.keys(tokens);
	}

	if(JSON.stringify(tokens) !== JSON.stringify(cache.tokens)) {
		cache.tokens = tokens;
		cache.tokenKeys = tokenKeys;
		cache.data = data;
	}

	return {
		tokens: tokens,
		tokenKeys: tokenKeys
	};

};
