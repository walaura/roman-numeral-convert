var assert = require('assert');
var convert = require('./../src/app.js');

describe('Basic', function() {

	it('should convert 1-10 to roman decimals', function() {
		let results = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
		[1,2,3,4,5,6,7,8,9,10].map((n,i) => {
			assert.equal(convert(n),results[i]);
		});
	});

	it('should convert 94 (a hard one)', function() {
		assert.equal(convert(94),'XCIV');
	});

	it('should convert 494 (a harder one)', function() {
		assert.equal(convert(494),'CDXCIV');
	});

	it('should convert 1997 (yolo)', function() {
		assert.equal(convert(1997),'MCMXCVII');
	});

});
