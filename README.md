# roman-numeral-convert

<center><img src="http://i.imgur.com/j1Zs8ad.gif"></center>

This tool will convert **any** integrer to a roman numeral provided it's not too large or negative and also it may fail.

    npm install roman-numeral-convert

    const Numeral = require('roman-numeral-convert');
    new Numeral(19); /*XIX*/

    /*you can also get the .number property to avoid type magic*/
    new Numeral(19).number;

You can pass a second argument as to override anything on data/data

    const Numeral = require('roman-numeral-convert');
    new Numeral(19,{
        tokens: {
    		1: '👉',
    		5: '🙅',
    		10: '🤢',
    		50: '😻',
    		100: 'C',
    		500: 'D',
    		1000: 'M',
    	}
    }); /*🤢👉🤢*/

You can also use it as a cli tool because why would you not want that i mean this is so useful

    sudo npm install roman-numeral-convert -g

    roman-numeral-convert 19
