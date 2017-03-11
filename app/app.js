'use strict';

import express from 'express';
import initDb from './db/initDb';
import { PostsDAO } from './db/dao/postsDAO';
import connectDb from './db/connectDb';
import { SERVER_PORT } from './config';
import posts from './web/routes/posts';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/posts', posts);

app.use((err, req, res, next) => {
    console.log(err.message);
    response.writeHead(400, {"Content-Type": "text/plain"});
    response.write("Bad request/error while obtaining posts");
    response.end();
});

const onConnect = () => {
    //TODO refactor that and separate clear logic to script
    PostsDAO.clear(
        () => initDb(
            () => {
                app.listen(SERVER_PORT, function () {
                    console.log(`[INFO] : App listening on port ${SERVER_PORT}!`);
                })
            })
    );
};

connectDb().then(onConnect);

