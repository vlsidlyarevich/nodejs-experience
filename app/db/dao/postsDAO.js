"use strict";

import { Post } from '../models/post';

export class PostsDAO {

    static createPost(post, callback) {
        Post.create(post, (err, result) => {
            callback && callback(err, result);
        });
    }

    static getPosts(callback) {
        Post.find({}, (err, result) => {
            callback && callback(err, result);
        });
    }

    static getPostById(id, callback) {
        const query = {_id: id};

        Post.findOne(query, (err, result) => {
            callback && callback(err, result);
        });
    }

    static updatePostById(id, post, callback) {
        const query = {'_id': id};

        Post.findOneAndUpdate(query, post, {new: true}, (err, result) => {
            callback && callback(err, result);
        });
    }

    static deletePostById(id, callback) {
        const query = {'_id': id};

        Post.findOneAndRemove(query, (err, result) => {
            callback && callback(err, result);
        });
    }

    static clear(callback) {
        Post.remove({}, (err, result) => {
            callback && callback(err, result);
        });
    }
}