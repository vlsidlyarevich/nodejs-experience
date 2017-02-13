"use strict";

import { handlePostRoutes } from './postHandler';

var handle = new Map();
handle.set('/post', handlePostRoutes);


export { handle }