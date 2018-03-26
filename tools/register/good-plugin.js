const Good = require ('good');
var plugin = {
  register: Good,
  options: {
    reporters :{
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args:[{
          response: '*',
          log: '*'
        }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  }
};

module.exports = plugin;
