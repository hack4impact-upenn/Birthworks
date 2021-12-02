'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CLIENT_URL = exports.NODE_ENV = exports.SENDGRID_EMAIL = exports.SENDGRID_API_KEY = exports.JWT_SECRET = exports.ATLAS_URI = void 0;
var dotenv_1 = require('dotenv');
var path_1 = require('path');
switch (process.env.NODE_ENV) {
  case 'development':
    console.log("Environment is 'development'");
    dotenv_1.config({
      path: path_1.resolve(__dirname, '../../config/.env.development'),
    });
    break;
  case 'test':
    console.log("Environment is 'test'");
    dotenv_1.config({
      path: path_1.resolve(__dirname, '../../config/.env.test'),
    });
    break;
  case 'production':
    console.log("Environment is 'production'");
    break;
  default:
    throw new Error("'NODE_ENV' " + process.env.NODE_ENV + ' is not handled!');
}
// project config
var NODE_ENV = process.env.NODE_ENV;
exports.NODE_ENV = NODE_ENV;
var ATLAS_URI = process.env.ATLAS_URI || 'mongodb://localhost:27017/myproject';
exports.ATLAS_URI = ATLAS_URI;
var CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:30000';
exports.CLIENT_URL = CLIENT_URL;
// auth config
var JWT_SECRET = process.env.JWT_SECRET || 'my-placeholder-string';
exports.JWT_SECRET = JWT_SECRET;
// sendgrid configs
var SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || 'my-placeholder-key';
exports.SENDGRID_API_KEY = SENDGRID_API_KEY;
var SENDGRID_EMAIL = process.env.SENDGRID_EMAIL || 'example@email.com';
exports.SENDGRID_EMAIL = SENDGRID_EMAIL;
