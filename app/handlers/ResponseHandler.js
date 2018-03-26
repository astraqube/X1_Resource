const _ = require('lodash');
const ResponseConstants = require('../constants/ResponseConstants');

const defaultResponse = (request) => {
  let response = {};
  response.status = "success";
  // response.origin = request.url;
  // response.executionTime = "";
  // response.uid = "";
  // response.sessionid = "";
  response.result = {};
  return response;

};


module.exports.handleSuccessResponse = (request, data) => {
  let response = defaultResponse(request);
  response.result = data;
  response.count = 1;
  if (_.isArray(data)) {
      response.count = data.length;
  }
  return response;

};

//https://github.com/hapijs/boom
module.exports.handleErrorResponse = (request, error) => {
  let response = defaultResponse(request);
  response.status = "failure";

  return response;

};
