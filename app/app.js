"use strict";

import express from 'express';
import initDb from "./db/initDb";
import { PostsDAO } from "./db/dao/postsDAO";
import connectDb from "./db/connectDb";
import { SERVER_PORT } from './config';

const app = express();

connectDb().then(
    () => PostsDAO.clear(
        () => initDb(
            () => {
                app.listen(SERVER_PORT, function () {
                    console.log(`[INFO] : App listening on port ${SERVER_PORT}!`);
                })
            })
    )
);

