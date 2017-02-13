"use strict";

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
    Post.find((error, posts) => {
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
    let post = qs.parse(postData);
    let newPost = new Post({
        title: post.title,
        subtitle: post.subtitle,
        content: post.content,
        author: post.author,
        date: post.date
    });
    console.log(post);

    newPost.save((error, createdPost) => {
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