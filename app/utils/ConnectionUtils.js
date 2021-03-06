module.exports.createMongoUri = (options) => {
    var uri = "mongodb://";
    if (options.username && options.username != "" && options.password && options.password != "") {
        uri += options.username + ":" + options.password + "@";
    }
    uri += options.host + ":" + options.port + "/" + options.database;
    return uri;
}
