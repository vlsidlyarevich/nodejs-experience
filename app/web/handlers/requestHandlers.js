"use strict";

import { handlePost } from './postHandler';

var handle = new Map();
handle.set('/post', handlePost);


export { handle }