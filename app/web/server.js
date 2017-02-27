"use strict";

import http from 'http';
import { SERVER_PORT } from '../config';

export function startServer(route, handle) {

    console.log('Listening on port ', SERVER_PORT);
    http.createServer(onRequest).listen(SERVER_PORT);
}

