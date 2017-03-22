"use strict";

import { Post } from "../../db/models/post";

function getPosts(request, response, next) {
    const handle = (posts) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(posts));
            response.end();
    };

    function onFailure() {
        next(new Error("Bad request/error while obtaining posts"));
    }

    Post.find().then(handle, onFailure);
}

function getPost(request, response, next) {
    const handle = (post) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();

    };

    function onFailure() {
        next(new Error("Bad request/error while obtaining post with id: " + request.params.id));
    }

    Post.getById(request.params.id).then(handle, onFailure);
}

function addPost(request, response, next) {
    const handle = (post) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
    };

    function onFailure() {
        next(new Error("Bad request/error while saving post"));
    }

    Post.create(request.body).then(handle, onFailure);
}

function updatePost(request, response, next) {
    const handle = (post) => {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(JSON.stringify(post));
        response.end();
    };

    function onFailure() {
        next(new Error("Bad request/error while updating post with id: " + request.params.id));
    }

    Post.updateById(request.params.id, request.body).then(handle, onFailure);
}

function deletePost(request, response, next) {
    const handle = (post) => {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(request.params.id));
            response.end();
    };

    function onFailure() {
        next(new Error("Bad request/error while deleting post with id: " + request.params.id));
    }

    Post.deleteById(request.params.id).then(handle, onFailure);
}

export { getPosts, addPost, deletePost, getPost, updatePost }