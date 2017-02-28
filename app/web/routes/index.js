'use strict';

import posts from './posts';
var express = require('express');
var router = express.Router();

router.use('/posts', posts);

export { router };