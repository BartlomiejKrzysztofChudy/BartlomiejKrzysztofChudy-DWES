import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${message}`;
});

const winstonLogger = winston.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'HH:mm:ss' }),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});

export const logger = {
  log: (message) => winstonLogger.info(message),
  info: (message) => winstonLogger.info(message),
  error: (message) => winstonLogger.error(message),
};
