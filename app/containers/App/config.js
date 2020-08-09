/* eslint-disable */

switch (process.env.NODE_ENV) {
  case 'production': {
    module.exports = require('./config-prod');
    break;
  }
  case 'development': {
    module.exports = require('./config-dev');
    break;
  }
  default: {
    module.exports = require('./config-dev');
    break;
  }
}
