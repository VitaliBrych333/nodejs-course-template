const fs = require('fs');
const { pipeline } = require('stream');
const program = require('./commander');
const transformStream = require('./transform-stream');

program.parse(process.argv);

let inStream;
let outStream;

if (program.input) {
  inStream = fs.createReadStream(program.input);
} else {
  inStream = process.stdin;
}

if (program.output) {
  outStream = fs.createWriteStream(program.output, { flags: 'a' });
} else {
  outStream = process.stdout;
}

pipeline(inStream, transformStream, outStream, err =>
  process.stderr.write('Sorry, but input or output file can not be found', err)
);
