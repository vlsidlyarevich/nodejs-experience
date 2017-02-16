"use strict";

import {Post} from '../models/post';

export function PostsDAO() {

    function createPost(post, callback) {
        Post.create(post, (err, result) => {
            callback && callback(err, result);
        });
    }

    function getPosts(callback) {
        Post.find({}, (err, result) => {
            callback && callback(err, result);
        });
    }

    function getPostById(id, callback) {
        const query = {_id: id};

        Post.findOne(query, (err, result) => {
            callback && callback(err, result);
        });
    }

    function updatePostById(id, post, callback) {
        const query = {'_id': id};

        Post.findOneAndUpdate(query, post, {new: true}, (err, result) => {
            callback && callback(err, result);
        });
    }

    function deletePostById(id, callback) {
        const query = {'_id': id};

        Post.findOneAndRemove(query, (err, result) => {
            callback && callback(err, result);
        });
    }
}