"use strict";

import { User } from '../../db/models/user';
import { SECRET_KEY } from '../../config';
import * as jwt from 'jsonwebtoken';

function authenticate(request, response, next) {
    const handle = (user, error) => {
        if (error || !user) {
            console.error("1");
            next(new Error("Authentication failed. User not found."))
        } else if (user.password !== request.body.password) {
            console.error("2");
            next(new Error("Authentication failed. Wrong password."))
        } else {
            console.error(user);
            console.error(request.body.username);
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user
            }, SECRET_KEY);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify({ "token": token }));
            response.end();
        }
    };

    User.getByUsername(request.body.username).then(handle);
}

export default { authenticate }