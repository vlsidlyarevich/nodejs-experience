"use strict";

import http from 'http';
import url from 'url';
import { SERVER_PORT } from '../config';

export function startServer(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        let postData = "";

        console.log("Request for " + pathname + " received.");

        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" +
                postDataChunk + "'.");
        });

        request.addListener("end", function () {
            route(request, response, handle, postData);
        });
    }

    console.log('Listening on port ', SERVER_PORT);
    http.createServer(onRequest).listen(SERVER_PORT);
}

