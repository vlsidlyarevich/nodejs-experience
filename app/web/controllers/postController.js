"use strict";

import { Post } from "../../db/models/post";


function getPosts(request, response, next) {
    const handle = (error, posts) => {
        if (error) {
            next(new Error("Bad request/error while obtaining posts"))
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(posts));
            response.end();
            next();
        }
    };

    Post.find().then(handle);
}

function getPost(request, response) {
    const handle = (error, post) => {
        if (error) {
            next(new Error("Bad request/error while obtaining post with id: " + request.params.id));
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
        }
    };

    Post.getById(request.params.id).then(handle);
}

function addPost(request, response) {
    const handle = (error, post) => {
        if (error) {
            next(new Error("Bad request/error while saving post"));
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
        }
    };

    Post.create(request.body).then(handle);
}

function updatePost(request, response) {
    const handle = (error, post) => {
        if (error) {
            next(new Error("Bad request/error while updating post with id: " + request.params.id));
        }
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(post));
        response.end();
    };

    Post.updateById(request.params.id, request.body).then(handle);
}

function deletePost(request, response) {
    const handle = (error, post) => {
        if (error) {
            console.log("[ERROR] : Error while deleting post with id: " + request.params.id);
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while deleting post");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(request.params.id));
            response.end();
        }
    };

    Post.deleteById(request.params.id).then(handle);
}

export { getPosts, addPost, deletePost, getPost, updatePost }