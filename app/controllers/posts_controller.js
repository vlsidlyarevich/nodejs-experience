var express = require('express');
var router = express.Router();
var url = require("url");
var postsDAO = require("../db/dao/postsDAO");

router.get('/', function (request, response) {
    var pathName = url.parse(request.url).pathname;
    console.log(pathName + " requested");
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.json(postsDAO.getAllPosts().toObject());
    response.end();
});

module.exports = router;

