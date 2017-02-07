var server = require("./server.js");
var initiator = require("./app/db/initiator.js");
var dbConnector = require("./app/db/connector.js");

// initiator.initDb();
server.start();
dbConnector.checkConnectivity();
