import httpContext from 'express-http-context';
const winston = require('winston');
const { combine, timestamp, colorize, simple } = winston.format;
const LEVEL = Symbol.for('level');
const MESSAGE = Symbol.for('message');

export interface TransformableInfo {
  [LEVEL]: string;
  [MESSAGE]: string;
  [key: string]: unknown;
}

const jsonFormatter = (logEntry: TransformableInfo) => {
  const requestId = httpContext.get('requestId');

  const base = {
    timestamp: new Date(),
    severity: logEntry[LEVEL].toUpperCase(),
    requestID: requestId
  };

  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

let format = process.env.NODE_ENV === 'jest'
  ? combine(timestamp(), colorize(), simple())
  : winston.format(jsonFormatter)();

const log = winston.createLogger({
  level: (process.env.LOG_LEVEL || 'info').toLowerCase(),
  handleExceptions: true,
  format: format,
  transports: [new winston.transports.Console()]
});

export default log;
