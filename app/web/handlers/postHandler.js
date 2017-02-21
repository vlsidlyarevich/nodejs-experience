"use strict";

import { PostsDAO } from "../../db/dao/postsDAO";
import { Post } from "../../db/models/post";
import qs from "querystring";

function handlePostRoutes(request, response, postData) {
    console.log("'Post' api is called");
    switch (request.method) {
        case 'POST':
            handleAddPost(request, response, postData);
            break;
        case 'GET':
            handleGetPosts(request, response);
            break;
        default:
            console.log("Can't find appropriate method in 'Post' api");
    }
}

function handleGetPosts(request, response) {
    PostsDAO.getPosts((error, posts) => {
        if (error) {
            console.log("Error while obtaining list of posts");
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

function handleGetPost(request, response) {

}

function handleAddPost(request, response, postData) {
    let postToAdd = JSON.parse(postData);
    console.log(postToAdd);
    let newPost = new Post({
        title: postToAdd.title,
        subtitle: postToAdd.subtitle,
        content: postToAdd.content,
        author: postToAdd.author,
        date: postToAdd.date
    });

    PostsDAO.createPost(newPost, (error, createdPost) => {
        if (error) {
            console.log("Error while saving post");
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.write("Bad request/error while saving post");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write(JSON.stringify(createdPost));
            response.end();
        }
    });
}

function handleUpdatePost(request, response) {

}

function handleDeletePost(request, response) {

}

export { handlePostRoutes }