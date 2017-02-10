"use strict";

import http from 'http';
import url from 'url';
import { SERVER_PORT } from '../config';

export function startServer(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(request, response, handle);
    }

    console.log('Listening on port ', SERVER_PORT);
    http.createServer(onRequest).listen(SERVER_PORT);
}

