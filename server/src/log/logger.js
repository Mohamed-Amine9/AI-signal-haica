const fs = require('fs');
const { createLogger, format, transports } = require('winston');

const logDir = 'logs';

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a writable stream for the log file
const logFileStream = fs.createWriteStream(`${logDir}/info.log`, { flags: 'a' });

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ stream: logFileStream })
  ]
});

module.exports = logger;