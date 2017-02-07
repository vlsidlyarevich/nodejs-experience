"use strict";

import server from "./server.js";
import postsDAO from "./app/db/dao/postsDAO";

// initiator.initDb();
server.start();
postsDAO.insertPost(new Post("1", "title", "subtitle", "content", "12:12:1996", "13:13:1313", "author"));
postsDAO.getAllPosts(console.log());
