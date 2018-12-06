var crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      password = 'd6F3Efeq';

//const fs = require('fs');

//var r = fs.createReadStream('file.txt');
// // zip content
// var zip = zlib.createGzip();
// // encrypt content
const decrypt = crypto.createDecipher(algorithm, password);

process.stdin.pipe(decrypt).pipe(process.stdout)
