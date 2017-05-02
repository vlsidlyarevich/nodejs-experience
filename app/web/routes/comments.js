'use strict';

import * as commentMiddleware from '../middlewares/commentMiddleware';
import express from 'express';
const router = express.Router();

router.get('/:postId/comments', commentMiddleware.getComments);
router.post('/:postId/comments', commentMiddleware.addComment);
router.put('/:postId/comments/:id', commentMiddleware.updateComment);
router.delete('/:postId/comments/:id', commentMiddleware.deleteComment);

export default router;