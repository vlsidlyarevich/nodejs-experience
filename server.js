var express = require('express');
var app = express();
var url = require("url");
var homeController = require('./app/controllers/home_controller');
var port = process.env.PORT || 8080;

app.use('/api', homeController);

app.use(function (request, response) {
    response.send('404: Page not Found', 404);
});

function start() {
    app.listen(port, function () {
        console.log('Listening on port ', port)
    })
}

exports.start = start;
