"use strict";

import server from "./server.js";
import initiator from "./app/db/initiator.js";
import Post from "./app/db/models/post";
import connectToDatabase from "./app/db/connector";

connectToDatabase();
initiator.initDb();
server.start();

Post.find({}, function(err, posts) {
    if (err){
        console.log(err)
    }

    console.log(posts);
});