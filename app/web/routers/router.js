"use strict";

export function route(request, responce, handle) {
    console.log("About to route a request for " + pathname);
    var pathname = url.parse(request.url).pathname;
    if(handle.has(pathname)){
        handle.get(pathname).call(request, responce);
    } else {
        console.log("There is no handler for such pathname: " + pathname)
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.write("Bad request");
        response.end();
    }
}