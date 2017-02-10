"use strict";

import { Post } from "../../db/models/post";

function handlePost(request, responce) {
    console.log("'Post' api is called");
    Post.find((error, posts) => {
        if (error) {
            console.log("Error while obtaining list of posts");
            response.writeHead(400, {"Content-Type": "text/plain"});
            responce.write("Bad request/error while obtaining posts")
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            responce.write(posts)
        }
    });
}


export { handlePost }