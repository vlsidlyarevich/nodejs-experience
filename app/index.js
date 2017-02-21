"use strict";

import { startServer } from "./web/server";
import initDb from "./db/initiator";
import connectToDatabase from "./db/connector";
import { route } from "./web/routers/router";
import { handle } from "./web/handlers/requestHandlers";
import { Post } from "./db/models/post";

connectToDatabase();
// initDb();
Post.remove({}, function () {
    
});

startServer(route, handle);