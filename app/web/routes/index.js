'use strict';

import { router as posts } from './posts';
import { app } from '../../app';
const express = require('express');
const router = express.Router();

app.use('/posts', posts);

export { router };