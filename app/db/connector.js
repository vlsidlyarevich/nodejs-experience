"use strict";

import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export default function () {
    configureMongoose();
    mongoose.connect(MONGODB_URL)
}

function configureMongoose() {
     mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + MONGODB_URL);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}