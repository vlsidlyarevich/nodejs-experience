var MongoClient = require('mongodb').MongoClient;
var config = require('../config.js');

function checkConnectivity() {
    MongoClient.connect(config.mongodb_url, function (error, db) {
        if (error) {
            throw error;
        } else {
            console.log("successfully connected to the database");
        }
        db.close();
    });
}

function getConnection(callback) {
    try {
        checkConnectivity();
        return MongoClient.connect(config.mongodb_url, function (error, db) {
            callback(db);
        });

    } catch (err) {
        console.log("can't establish connection to database")
    }
}

exports.checkConnectivity = checkConnectivity;
exports.getConnection = getConnection;