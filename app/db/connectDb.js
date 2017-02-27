"use strict";

import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export default function () {
    return new Promise((resolve, reject)=>{
        mongoose.connect(MONGODB_URL);
        configureMongoose(resolve);
    });
}

function configureMongoose(callback) {
    mongoose.connection.on('open', () => {
        console.log('Mongoose default connection open to ' + MONGODB_URL);
        callback("Connected");
    });

    mongoose.connection.on('connected', () => {
        console.log('Mongoose default connection opened to ' + MONGODB_URL);
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}