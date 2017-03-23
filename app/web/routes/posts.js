'use strict';

import express from 'express';
import * as postMiddleware from '../middlewares/postMiddleware';

const router = express.Router();

router.get('/', postMiddleware.getPosts);
router.get('/:id', postMiddleware.getPost);
router.post('/', postMiddleware.addPost);
router.put('/:id', postMiddleware.updatePost);
router.delete('/:id', postMiddleware.deletePost);

export default router;
