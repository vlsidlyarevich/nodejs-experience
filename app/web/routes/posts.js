'use strict';

import * as postController from '../controllers/postController';
const express = require('express');
const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.addPost);
router.update('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export { router };