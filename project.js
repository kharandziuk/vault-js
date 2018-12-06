const { promisify } = require('util')
const fs = require('fs')
const template = require('es6-template-strings');

const { Writable } = require('stream')
const crypto = require('crypto'),
  algorithm = 'aes-256-ctr'

const prompt = require('password-prompt')
prompt('password: ', { method: 'hide' }).then((password) => {
  const streamAsPromise = (readable) => {
    const result = []
    const w = new Writable({
      write(chunk, encoding, callback) { 
        result.push(chunk)
        callback()
      }
    })
    readable.pipe(w)
    return new Promise((resolve, reject) => {
      w.on('finish', resolve)
      w.on('error', reject)
    }).then(() => result.join(''))
  }

  var r = fs.createReadStream('secrets');
  const encrypt = crypto.createCipher(algorithm, password);
  Promise.all([
    streamAsPromise(r.pipe(encrypt)),
    promisify(fs.readFile)('ENC.tmpl')
  ]).then(([secretsStr, templateStr]) => {
    const secrets = JSON.parse(secretsStr)
    return template(templateStr, secrets)
  }).then(x => console.log(x))
})

