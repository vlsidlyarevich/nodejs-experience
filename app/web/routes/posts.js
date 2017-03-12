'use strict';

import * as postMiddleware from '../middlewares/postMiddleware';
import express from 'express';
const router = express.Router();

router.get('/', postMiddleware.getPosts);
router.get('/:id', postMiddleware.getPost);
router.post('/', postMiddleware.addPost);
router.put('/:id', postMiddleware.updatePost);
router.delete('/:id', postMiddleware.deletePost);

export default router;