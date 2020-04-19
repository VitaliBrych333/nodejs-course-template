const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');

const morgan = require('morgan');
const { createWriteStream } = require('fs');
const { logger, handleError } = require('./errorHandler');

const { MONGO_CONNECTION_STRING } = require('./common/config');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const mongoose = require('mongoose');

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB error connection:'));
  db.once('open', async () => {
    console.log('Connected to DB');
    await db.dropDatabase();
    cb();
  });
};

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('query', req => JSON.stringify(req.query));

app.use(
  morgan(':url :query :body', { stream: createWriteStream('MyRequests.log') })
);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  handleError(err, res);
  next();
});

process.on('uncaughtException', err => {
  logger.error({ statCode: 500, message: err.message });

  const exit = process.exit;

  logger.on('finish', () => exit(1));
});

process.on('unhandledRejection', reason => {
  logger.error({ statCode: 500, message: reason });
});

module.exports = { app, connectDB };
