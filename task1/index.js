// const { program } = require('commander');
// program.version('0.0.1');

// program.command('say').description('ggrrgr').alias('s').action(function (name) {console.log(name)});

// program.option('-d, --do', 'Do something').action(function(task) {console.log(`Doing this ${task}`)});
// program.parse(process.argv);

const { program } = require('commander');

program
  .requiredOption('-s, --shift <number>', 'a shift')
  .requiredOption('-a, --action [type],', 'an action encode/decode')
  .option('-i, --input <filename>', 'an input file')
  .option('-o, --output <filename>', 'an output file');

program.parse(process.argv);
