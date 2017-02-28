"use strict";

import { startServer } from "./web/server";
import initDb from "./db/initDb";
import { PostsDAO } from "./db/dao/postsDAO";
import connectDb from "./db/connectDb";
import { SERVER_PORT } from './config';

// const app = express();

connectDb().then(
    () => PostsDAO.clear(
        () => initDb(
            () => PostsDAO.getPosts((error, result)=> {
                console.log(result);
            })
        )
    )
);

