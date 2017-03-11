'use strict';

import * as postController from '../controllers/postController';
import express from 'express';
const router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.addPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export { router };