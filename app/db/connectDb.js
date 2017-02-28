"use strict";

import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export default function () {
    return new Promise((resolve, reject)=>{
        mongoose.connect(MONGODB_URL);
        configureMongoose(resolve, reject);
    });
}

function configureMongoose(resolve, reject) {
    mongoose.connection.on('open', () => {
        console.log('[INFO] : Mongoose default connection open to ' + MONGODB_URL);
        resolve("Connected");
    });

    mongoose.connection.on('connected', () => {
        console.log('[INFO] : Mongoose default connection opened to ' + MONGODB_URL);
    });

    mongoose.connection.on('error', (err) => {
        console.log('[ERROR] : Mongoose default connection error: ' + err);
        reject("Error")
    });

    mongoose.connection.on('disconnected', () => {
        console.log('[ERROR] : Mongoose default connection disconnected');
        reject("Error")
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('[INFO] : Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}