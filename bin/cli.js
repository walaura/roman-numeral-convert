#! /usr/bin/env node

var Numeral = require('./../src/app.js');

process.stdout.write(new Numeral(process.argv[2])+'\n');
