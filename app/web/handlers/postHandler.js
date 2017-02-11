"use strict";

import { Post } from "../../db/models/post";

function handlePost(request, response) {
    console.log("'Post' api is called");
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

export { handlePost }