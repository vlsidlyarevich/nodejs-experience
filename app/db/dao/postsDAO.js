var mongoose = require('mongoose');
var Post = require('../schema');

function getAllPosts() {
    console.log("*****************Finding all posts*****************");
    Post.find(function (err, posts) {
        if (err) return console.error(err);
        return posts;
    });
}

exports.getAllPosts = getAllPosts;