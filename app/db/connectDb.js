"use strict";

import mongoose from "mongoose";
import { MONGODB_URL } from "../config";
import { log } from '../app';

export default function () {
    return new Promise((resolve, reject)=>{
        mongoose.connect(MONGODB_URL);
        configureMongoose(resolve, reject);
    });
}

function configureMongoose(resolve, reject) {
    mongoose.connection.on('open', () => {
        log.info('Mongoose default connection open to ' + MONGODB_URL);
        resolve("Connected");
    });

    mongoose.connection.on('connected', () => {
        log.info('[INFO] : Mongoose default connection opened to ' + MONGODB_URL);
    });

    mongoose.connection.on('error', (err) => {
        log.error('[ERROR] : Mongoose default connection error: ' + err);
        reject("Error")
    });

    mongoose.connection.on('disconnected', () => {
        log.error('[ERROR] : Mongoose default connection disconnected');
        reject("Error")
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            log.info('[INFO] : Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}