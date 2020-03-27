const { Transform } = require('stream');
const cipher = require('./cipher');
const program = require('./commander');

const transformStream = new Transform({
  transform(chunk) {
    const res = cipher(chunk.toString(), program.action, program.shift);
    this.push(res);
  }
});

module.exports = transformStream;
