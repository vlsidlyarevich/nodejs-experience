"use strict";

import { startServer } from "./web/server";
import initDb from "./db/initiator";
import connectToDatabase from "./db/connector";
import { route } from "./web/routers/router";
import { handle } from "./web/handlers/requestHandlers";

connectToDatabase();
initDb();
startServer(route, handle);