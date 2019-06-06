const winston = require('winston');
const logger = winston.createLogger({
    // level: 'debug',
    level: 'silent',
    format: winston.format.json(),
    transports: [
      
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'app.log' })
    ]
  });
  module.exports = logger;