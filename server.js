const express = require("express");
const { soap: soapServer } = require("strong-soap");
const fs = require("fs");
const path = require("path");
const http = require('http');
const swStats = require("swagger-stats");

const logger = require('./src/logger');
const { personalDetailsService, contactDetailsService, addressDetailsService } = require('./src/services');
const baseURL = process.env.HOST || 'http://localhost';
const basePORT = process.env.PORT || '8000';

const app = express();
app.use(logger.httpLogger);
app.use(swStats.getMiddleware());
require('./src/api/client-details')(app);


const server = http.createServer(app).listen(basePORT, () => {
  logger.info(`Application listening on port ${basePORT}`);
});



const replaceHost = (wsdl) => wsdl.replace('${SOAP_BASE_URL}', `${baseURL}${basePORT}`);

fs.readFile(`${path.join(__dirname)}/src/wsdl/PersonalDetailsService.wsdl`, 'utf8', (err, data) => {
  if (err) {
    logger.error(`Error: ${err}`);
  }
  const personalDetailsWsdl = replaceHost(data);
  soapServer.listen(server, '/services/personal-details', personalDetailsService(), personalDetailsWsdl);
  logger.info('Personal Details server is running');
});

fs.readFile(`${path.join(__dirname)}/src/wsdl/ContactDetailsService.wsdl`, 'utf8', (err, data) => {
  if (err) {
    logger.error(`Error: ${err}`);
  }
  const contactDetailsWsdl = replaceHost(data);
  soapServer.listen(server, '/services/contact-details', contactDetailsService(), contactDetailsWsdl);
  logger.info('Contact Details server is running');
});

fs.readFile(`${path.join(__dirname)}/src/wsdl/AddressDetailsService.wsdl`, 'utf8', (err, data) => {
  if (err) {
    logger.error(`Error: ${err}`);
  }
  const addressDetailsWsdl = replaceHost(data);
  soapServer.listen(server, '/services/address-details', addressDetailsService(), addressDetailsWsdl);
  logger.info('Address Details server is running');
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', reason);
});
process.on('uncaughtException', (error) => {
  logger.error('Unhandled exception', error);
  server.close();
  setTimeout(() => {
    process.exit(1);
  }, 100);
});
process.on('SIGINT', () => {
  logger.info('Shutdown Command Received');
  server.close();
  setTimeout(() => {
    process.exit(0);
  }, 100);
});
