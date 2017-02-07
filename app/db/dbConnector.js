"use strict";

import {mongodb} from 'mongodb';
import {config} from '../config.js';

export class DbConnector {

    constructor() {
        this.mongoClient = mongodb.MongoClient;
    }

    checkConnectivity() {
        this.mongoClient.connect(config.mongodb_url,(error, db) => {
            if (error) {
                throw error;
            } else {
                console.log("successfully connected to the database");
            }
            db.close();
        });
    }

    getConnection(callback) {
        try {
            this.checkConnectivity();
            return this.mongoClient.connect(config.mongodb_url,(error, db) => {
                callback(db);
            });

        } catch (err) {
            console.log("can't establish connection to database")
        }
    }
}