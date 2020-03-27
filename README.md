# Caesar cipher CLI

## Running

1. After download project and npm install - cd caesar-cipher-cli
2. In bash - node caesar-cli.js with options:
  2.1. **-s, --shift**: a shift value (required)
  2.2. **-a, --action**: an action encode/decode (required)
  2.3. **-i, --input**: an input file (optional)
  2.4. **-o, --output**: an output file (optional)

## For instance
node caesar-cli.js --action decode --shift 10 --input './files/input.txt' --output './files/output.txt'
node caesar-cli.js --action encode --shift 10

for mistake - node caesar-cli.js --action decode --shift 10 --input './files/inpuughghgyut.txt' --output './files/output.txt'

# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To test without authorization

```
npm test
```

To test with authorization

```
npm run test:auth
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
