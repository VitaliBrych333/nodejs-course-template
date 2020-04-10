const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'MyError.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

class ErrorHandler extends Error {
  constructor(statCode, message) {
    super();
    this.statCode = statCode;
    this.message = message;
  }
}

function handleError(err, res) {
  logger.error(err);

  const { statCode, message } = err;

  if (statCode) {
    res.status(statCode).json({
      status: 'error',
      statCode,
      message
    });

    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
}

process.on('uncaughtException', err => {
  logger.error({ statCode: 500, message: err.message });

  const exit = process.exit;

  exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error({ statCode: 500, message: reason });
});

module.exports = { ErrorHandler, handleError };
