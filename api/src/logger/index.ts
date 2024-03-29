import winston, { format } from 'winston';

const { combine, timestamp } = format;

const logger = winston.createLogger({
  exitOnError: false,
  format: combine(
    /* format.timestamp({
         format: "YYYY-MM-DD HH:mm:ss",
       }), */
    timestamp(),
    // eslint-disable-next-line
    format.printf((info: any) => `${info.timestamp} | ${info.message}`),
    format.errors({ stack: true }),
    format.splat()
    // format.json(),
  ),
  /* rejectionHandlers: [
       new winston.transports.File({ filename: 'logs/rejections.log' }),
     ], */
  exceptionHandlers: [new winston.transports.File({ filename: 'logs/exceptions.log' })],
});

const transports = {
  fileInfo: new winston.transports.File({
    filename: 'logs/combined.log',
    level: 'info',
    format: format.json(),
  }),
  fileError: new winston.transports.File({
    filename: 'logs/errors.log',
    level: 'error',
    format: format.json(),
  }),
  console: new winston.transports.Console({
    level: 'verbose',
    format: combine(
      format.colorize(),
      // eslint-disable-next-line
      format.printf((info: any) => `${info.level} | ${info.timestamp} | ${info.message}`)
    ),
  }),
  http: new winston.transports.Http({
    level: 'verbose',
    format: combine(format.colorize(), format.simple()),
  }),
};

logger.add(transports.fileInfo);
logger.add(transports.fileError);
logger.add(transports.http);

if (process.env.NODE_ENV !== 'production') {
  logger.add(transports.console);
}

export default logger;
