'use strict';

import express from 'express';
import bunyan from 'bunyan';
import bodyParser from 'body-parser';
import initDb from './db/initDb';
import connectDb from './db/connectDb';
import { SERVER_PORT } from './config';
import { Post } from './db/models/post';
import posts from '../app/web/routes/posts';

export const log = bunyan.createLogger({ name: 'blog' });
export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/posts', posts);

app.use((err, request, response, next) => {
    log.error(err.message);
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.write(err.message);
    response.end();
});

const onConnect = () => {
    //TODO refactor that and separate clear logic to script
    Post.remove().then(
        initDb(
            () => {
                app.listen(SERVER_PORT, () => {
                    log.info(`App listening on port ${SERVER_PORT}!`);
                });
            })
    );
};

connectDb().then(onConnect);

