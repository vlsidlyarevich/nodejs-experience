"use strict";

import url from 'url';

export function route(request, response, handle) {
    let pathname = url.parse(request.url).pathname;
    if (handle.has(pathname)) {
        handle.get(pathname)(request, response);
    } else {
        console.log("There is no handler for such pathname: " + pathname);
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.write("Bad request");
        response.end();
    }
}