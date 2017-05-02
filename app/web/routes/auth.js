import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware.authenticate);

export default router;
