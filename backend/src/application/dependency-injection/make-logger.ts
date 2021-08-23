import * as path from 'path';
import { pino } from 'pino';
import Logger from '../../domain/Logger';
import PinoLogger from '../../infrastructure/PinoLogger';

const getLogLevel = (logLevel?: string): pino.LevelWithSilent => {
  console.log(logLevel);
  switch (logLevel) {
    case 'silent':
    case 'trace':
    case 'debug':
    case 'info':
    case 'warn':
    case 'error':
    case 'fatal':
      return logLevel;
    default:
      return 'info';
  }
};

const pinoInstance = pino(pino.transport({
  targets: [
    {
      target: path.join(__dirname, '../log-transports/console.mjs'),
      level: getLogLevel(process.env.IIFY_CONSOLE_LOG_LEVEL),
      options: {},
    },
    {
      target: path.join(__dirname, '../log-transports/rotating-file.mjs'),
      level: getLogLevel(process.env.IIFY_FILE_LOG_LEVEL),
      options: {
        path: process.env.IIFY_FILE_LOG_PATH,
        interval: process.env.IIFY_FILE_LOG_ROTATION_INTERVAL,
      },
    },
  ],
}));

const logger = new PinoLogger(pinoInstance);

export default function (): Logger {
  return logger;
}
