var config = require('config');

var plugin = {
  register: require('hapi-swagger'),
  options: {
    info: {
      title: config.swagger.title,
      version: config.swagger.version
    }
  }
};

module.exports = plugin;
