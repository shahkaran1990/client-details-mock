const dwpNodeLogger = require('@dwp/node-logger');

const logger = dwpNodeLogger('api', {
  logLevel: process.env.LOG_LEVEL || 'info',
  basicLogging: true,
});

module.exports = logger;
