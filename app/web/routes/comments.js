'use strict';

import * as commentMiddleware from '../middlewares/commentMiddleware';
import express from 'express';
const router = express.Router();

router.get('comments/:id', commentMiddleware.getComments);
router.post('comments', commentMiddleware.addComment);
router.put('/posts/:id/comments/:id', commentMiddleware.updateComment);
router.delete('/posts/:id/comments/:id', commentMiddleware.deleteComment);

export default router;