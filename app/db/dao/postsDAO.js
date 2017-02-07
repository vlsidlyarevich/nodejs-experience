"use strict";

import {DbConnector} from '../dbConnector';

export class PostsDAO {

    getAllPosts(callback) {
        console.log("Finding all posts");
        DbConnector.getConnection((db) => {
            var cursor = db.collection('posts').find();
            cursor.each((error, result) => {
                assert.equal(error, null);
                if (result != null) {
                    console.dir(result);
                } else {
                    callback();
                }
            });
        });
    }

    insertPost(post, callback) {
        console.log("Inserting new post: " + post);
        DbConnector.getConnection((db) => {
            db.collection('posts').insertOne(post, (error, result) => {
                if (error) {
                    console.log("Error due getting post: " + post);
                } else {
                    console.log("Successfuly inserted post: " + post);
                    callback(result)
                }
            });
        });
    }
}