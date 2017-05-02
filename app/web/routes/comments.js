'use strict';

import * as commentMiddleware from '../middlewares/commentMiddleware';
import express from 'express';
const router = express.Router();

router.get('/', commentMiddleware.getComments);
router.post('/', commentMiddleware.addComment);
router.put('/:commentId', commentMiddleware.updateComment);
router.delete('/:commentId', commentMiddleware.deleteComment);

export default router;