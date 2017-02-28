"use strict";

import { PostsDAO } from "../../db/dao/postsDAO";
import { Post } from "../../db/models/post";


function getPosts(request, response) {
    PostsDAO.getPosts((error, posts) => {
        if (error) {
            console.log("[ERROR] : Error while obtaining list of posts");
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while obtaining posts");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(posts));
            response.end();
        }
    });
}

function getPost(request, response) {
    PostsDAO.getPostById(request.params.id, (error, post) => {
        if (error) {
            console.log("[ERROR] : Error while obtaining post with id: " + request.params.id);
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while obtaining post with id: " + request.params.id);
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
        }
    });
}

function addPost(request, response) {
    let postToAdd = req.body;
    let newPost = new Post({
        title: postToAdd.title,
        subtitle: postToAdd.subtitle,
        content: postToAdd.content,
        author: postToAdd.author,
        date: postToAdd.date
    });

    PostsDAO.createPost(newPost, (error, post) => {
        if (error) {
            console.log("[ERROR] : Error while saving post");
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while saving post");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
        }
    });
}

function updatePost(request, response) {
    let postToAdd = req.body;
    let newPost = new Post({
        title: postToAdd.title,
        subtitle: postToAdd.subtitle,
        content: postToAdd.content,
        author: postToAdd.author,
        date: postToAdd.date
    });

    PostsDAO.updatePostById(request.params.id, newPost, (error, post) => {
        if (error) {
            console.log("[ERROR] : Error while updating post with id: " + request.params.id);
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while updating post");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(post));
            response.end();
        }
    });
}

function deletePost(request, response) {
    PostsDAO.deletePostById(request.params.id, (error, post) => {
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
    });
}

export { getPosts, addPost, deletePost, getPost, updatePost }