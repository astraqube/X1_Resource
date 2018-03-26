const Path = require('path');

module.exports.handleBadRequest = () => {
  return {
    auth:false,
    // "tags" enable swagger to document API
    tags: ['api'],
    description: '404 Error Html',
    notes: 'Returns html page when incorrect route is requested',
    handler: (request, reply) => {
      reply.file(Path.join(__dirname , '../../public/404.html'));
    }
  };
};
