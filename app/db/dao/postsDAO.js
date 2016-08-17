var mongoose = require('mongoose');
var Post = require('../schema');

function getAllPosts() {
    Post.find(function (err, posts) {
        if (err) return console.error(err);
        return posts;
    });
}