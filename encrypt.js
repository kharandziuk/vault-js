var crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = 'd6F3Efeq';

//const fs = require('fs');

//var r = fs.createReadStream('file.txt');
// // zip content
// var zip = zlib.createGzip();
// // encrypt content
const encrypt = crypto.createCipher(algorithm, password);

process.stdin.pipe(encrypt).pipe(process.stdout)
