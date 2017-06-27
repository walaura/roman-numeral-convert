# roman-numeral-convert



<center><img src="http://i.imgur.com/j1Zs8ad.gif"></center>



Convert **any** integrer to a roman numeral provided it's not too large or it may fail or hang.

    npm install roman-numeral-convert

	/*and then*/
    const Numeral = require('roman-numeral-convert');
    let nineteen = new Numeral(19); /*XIX*/

    /*you can also get the .number property to avoid type magic*/
    nineteen.number;

## cool things
You can pass a second argument to override any of the options on `data/data.js` AS A VERY COOL THING this converter uses a general method so tokens don't have to be multiples of 10, 5. You can use any numbers and it'll improvise from there

    const Numeral = require('roman-numeral-convert');
	
    let puke = new Numeral(19,{
		tokens: {
    		1: '👉',
    		5: '🙅',
    		10: '🤢',
    		50: '😻',
    		100: '🤡',
    		500: '💩',
    		1000: '🤖',
		}
    }); 
	
	console.log(puke); /*🤢👉🤢*/

## cooler things
You can also use it as a cli tool because why would you not want that i mean this is so useful

    sudo npm install roman-numeral-convert -g

    roman-numeral-convert 19
