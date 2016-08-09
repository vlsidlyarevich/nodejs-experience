var express = require('express')
var app = express()
var url = require("url")
var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  var pathName = url.parse(request.url).pathname;
  console.log(pathName + " requested");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello world!");
  response.end();
})

app.use(function (request, response) {
    response.send('404: Page not Found', 404);
});

function start(){
  app.listen(port, function () {
    console.log('Listening on port ', port)
  })
}

exports.start = start;
