"use strict";

import { startServer } from "./web/server";
import initDb from "./db/initiator";
import connectToDatabase from "./db/connector";
import { route } from "./web/routers/router";

connectToDatabase();
initDb();
startServer(route);