'use strict';

const readline = require('readline');
const Stream = require('stream');
const fs = require('fs');

function readLines (fileName) {
    const stream = fs.createReadStream(fileName, {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      bufferSize: 1
    });

    const outstream = new Stream();
    const rl = readline.createInterface(stream, outstream);
    
    stream.on('error', (e) => {
      console.log('Error in read-stream: %s', e.toString());
    })
  
    stream.on('end', () => {
      console.log('Read-Stream ended.');
      rl.close();
    })
  
    return rl
  }
  
  module.exports = readLines;