# Caesar cipher CLI

## Running

1. After download project and npm install - cd caesar-cipher-cli
2. In bash - node caesar-cli.js with options:

  1. **-s, --shift**: a shift value (required)
  2. **-a, --action**: an action encode/decode (required)
  3. **-i, --input**: an input file (optional)
  4. **-o, --output**: an output file (optional)

## For instance

node caesar-cli.js --action decode --shift 10 --input './files/input.txt' --output './files/output.txt'

node caesar-cli.js --action encode --shift 10

for mistake:
  node caesar-cli.js --action decode --shift 10 --input './files/inpuughghgyut.txt' --output './files/output.txt'
