import path from 'path';
import {SPLAT} from 'triple-beam';
import winston from 'winston';
import 'winston-daily-rotate-file';

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  dailyRotateFile: {
    dirname: path.resolve('./logs/%DATE%/'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    json: false,
    zippedArchive: true,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatMeta = (meta: any) => {
  const splat = meta[SPLAT];
  if (splat?.length) {
    return splat.length === 1 ? splat[0] : splat;
  }
  return '';
};

const errorFilter = winston.format((info, opts) => {
  return info.level === 'error' ? info : false;
});

const warnFilter = winston.format((info, opts) => {
  return info.level === 'warn' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
  return info.level === 'info' ? info : false;
});

const debugFilter = winston.format((info, opts) => {
  return info.level === 'debug' ? info : false;
});

const customFormat = winston.format.printf(info => {
  const {timestamp, level, message, label = '', ...meta} = info;
  let file = '';
  try {
    const error = new Error();
    const stackArray = error.stack?.toString().split(/\n.*at\s/) ?? [];
    for (let index = 1; index < stackArray.length; index++) {
      const element = stackArray[index];
      if (element.toLowerCase().indexOf('create-logger') !== -1) {
        const fileMatch = stackArray[index + 1].match(/\((.*)\)/);
        file = fileMatch ? fileMatch[1] : stackArray[index + 1];
        break;
      }
    }
    // eslint-disable-next-line
  } catch {}
  const metaData = formatMeta(meta);
  let str = `timestamp: ${timestamp},
  location: '${file}',
  level: ${level.toUpperCase()},
  message: '${message}'`;

  if (label) {
    str += `,\r\n  label: '${label}'`;
  }
  if (metaData) {
    const data = metaData;
    str += `,\r\n  data: ${
      typeof data === 'object'
        ? !data.stack
          ? JSON.stringify(data)
          : JSON.stringify(data.stack.toString().split(/\n.*at\s/))
        : data
    }`;
  }
  return `{
  ${str}
}`;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({label: 'default'}),
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    customFormat,
  ),
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'error.log',
      format: winston.format.combine(errorFilter()),
      ...options.dailyRotateFile,
    }),
    new winston.transports.DailyRotateFile({
      level: 'warn',
      filename: 'warn.log',
      format: winston.format.combine(warnFilter()),
      ...options.dailyRotateFile,
    }),
    new winston.transports.DailyRotateFile({
      level: 'info',
      filename: 'info.log',
      format: winston.format.combine(infoFilter()),
      ...options.dailyRotateFile,
    }),
    new winston.transports.DailyRotateFile({
      level: 'debug',
      filename: 'debug.log',
      format: winston.format.combine(debugFilter()),
      ...options.dailyRotateFile,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: 'exception.log',
      ...options.dailyRotateFile,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: 'rejections.log',
      ...options.dailyRotateFile,
    }),
  ],
});
