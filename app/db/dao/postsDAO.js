var mongoose = require('mongoose');
var Post = require('../schema');

function getAllPosts(callback) {
    console.log("*****************Finding all posts*****************");
    Post.find().lean().exec(function (err, posts) {
        if (err) return console.error(err);
        callback(posts);
    });
}

exports.getAllPosts = getAllPosts;