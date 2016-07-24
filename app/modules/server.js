var http = require("http");
var url = require("url");

function start() {
    function onRequest(request, response) {
        var pathName = url.parse(request.url).pathname;
        console.log(pathName + " requested");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello world!");
        response.end();
    }

    http.createServer(onRequest).listen(8080);
    console.log("Server has started");
}

exports.start = start;