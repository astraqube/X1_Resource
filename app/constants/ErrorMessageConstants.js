//Error Codes and Messages inspired from https://msdn.microsoft.com/en-us/library/azure/dd179357.aspx

module.exports.RESOURCE_NOT_FOUND = "The specified resource does not exist.";
module.exports.MISSING_QUERY_PARAM = "Required Query Parameter was not specified.";
module.exports.MISSING_REQUEST_BODY = "Required HTTP Body was not specified.";
module.exports.INTERNAL_ERROR = "The server encountered an internal error. Please retry the request.";
module.exports.UNAUTHORIZED = "Unauthorized Request. Please retry this request using access token";
module.exports.USER_ALREADY_EXISTS = "User Already Exists";
module.exports.MISSING_REQUEST_PARAM = "Required Request Parameter was not specified.";
