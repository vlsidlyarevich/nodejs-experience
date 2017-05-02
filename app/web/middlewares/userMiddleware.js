"use strict";

import { User } from "../../db/models/user";

function getUsers(request, response, next) {
    const handle = (users, error) => {
        if (error) {
            next(new Error("Bad request/error while obtaining users"))
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(users));
            response.end();
        }
    };

    User.find().then(handle);
}

function getUser(request, response, next) {
    const handle = (user, error) => {
        if (error) {
            next(new Error("Bad request/error while obtaining user with id: " + request.params.id));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(user));
            response.end();
        }
    };

    User.getById(request.params.id).then(handle);
}

function getUserByUsername(request, response, next) {
    const handle = (user, error) => {
        if (error) {
            next(new Error("Bad request/error while obtaining user with id: " + request.params.id));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(user));
            response.end();
        }
    };

    User.getByUsername(request.params.username).then(handle);
}

function addUser(request, response, next) {
    const handle = (user, error) => {
        if (error) {
            next(new Error("Bad request/error while saving user"));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(user));
            response.end();
        }
    };

    User.create(request.body).then(handle);
}

function updateUser(request, response, next) {
    const handle = (user, error) => {
        if (error) {
            next(new Error("Bad request/error while updating user with id: " + request.params.id));
        }
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write(JSON.stringify(user));
        response.end();
    };

    User.updateById(request.params.id, request.body).then(handle);
}

function deleteUser(request, response, next) {
    const handle = (user, error) => {
        if (error) {
            next(new Error("Bad request/error while deleting user with id: " + request.params.id));
        } else {
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(request.params.id));
            response.end();
        }
    };

    User.deleteById(request.params.id).then(handle);
}

export { getUsers, addUser, deleteUser, getUser, updateUser }