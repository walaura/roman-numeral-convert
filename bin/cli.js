#! /usr/bin/env node

var convert = require('./../src/app.js');

process.stdout.write(convert(process.argv[2])+'\n');
