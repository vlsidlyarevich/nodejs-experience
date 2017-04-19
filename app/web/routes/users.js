'use strict';

import * as userMiddleware from '../middlewares/userMiddleware';
import express from 'express';
const router = express.Router();

router.get('/', userMiddleware.getUsers);
router.get('/:id', userMiddleware.getUser);
router.post('/', userMiddleware.addUser);
router.put('/:id', userMiddleware.updateUser);
router.delete('/:id', userMiddleware.deleteUser);


export default router;