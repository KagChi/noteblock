/* eslint global-require: "off" */
const http = require('http');
const { logger } = require('./Utility/Logger');
require('dotenv').config();

const GLitch = (process.env.PROJECT_DOMAIN !== undefined
  && process.env.PROJECT_INVITE_TOKEN !== undefined
  && process.env.API_SERVER_EXTERNAL !== undefined
  && process.env.PROJECT_REMIX_CHAIN !== undefined);
const Replit = (process.env.REPLIT_DB_URL !== undefined);
function initialize(glitch = false, replit = false) {
  if (glitch) {
    logger.info('[GLITCH ENVIRONMENT DETECTED] [STARTING WEBSERVER]');
    http.createServer((req, res) => {
      const now = new Date().toLocaleString('en-US');
      res.end(`OK (200) - ${now}`);
    }).listen(3000);
    return require('./index');
  } if (replit) {
    logger.info('[REPLIT ENVIRONMENT DETECTED] [STARTING WEBSERVER]');
    http.createServer((req, res) => {
      const now = new Date().toLocaleString('en-US');
      res.end(`OK (200) - ${now}`);
    }).listen(3000);
    return require('./index');
  } return require('./index');
}

initialize(GLitch, Replit);
