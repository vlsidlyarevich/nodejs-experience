import express from 'express';
import bunyan from 'bunyan';
import bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import initDb from './db/initDb';
import connectDb from './db/connectDb';
import { SERVER_PORT, SECRET_KEY } from './config';
import Post from './db/models/post';
import posts from '../app/web/routes/posts';
import users from '../app/web/routes/users';
import auth from '../app/web/routes/auth';

export const log = bunyan.createLogger({ name: 'blog' });
export const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/auth', auth);

// app.use(function (request, response, next) {
//     let token = request.body.token || request.query.token || request.headers['x-auth-token'];
//     if (token) {
//         jwt.verify(token, SECRET_KEY, function (err, decoded) {
//             if (err) {
//                 return response.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 request.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return response.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

app.use('/api/posts', posts);
app.use('/api/users', users);

app.use((err, request, response, next) => {
    log.error(err.message);
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.write(err.message);
    response.end();
});

const onConnect = () => {
    // TODO refactor that and separate clear logic to script
    Post.remove().then(
        initDb(
            () => {
                app.listen(SERVER_PORT, () => {
                    log.info(`App listening on port ${SERVER_PORT}!`);
                });
            })
    );
};

// TODO make middleware to chek is it there connection to db, if no, wait 15 sec
connectDb().then(onConnect);

