var server = require("./server.js");
var initiator = require("./app/db/initiator.js");

initiator.initDb();
server.start();
