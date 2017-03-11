'use strict';

import express from 'express';
import initDb from './db/initDb';
import { PostsDAO } from './db/dao/postsDAO';
import connectDb from './db/connectDb';
import { SERVER_PORT } from './config';
import { router as posts } from './web/routes/posts';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/posts', posts);

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

