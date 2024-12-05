import express from 'express';
import verifyToken from '../middleware/index.js';
import { getAllDaurUlang } from '../controllers/daur-ulang.controller.js';

const router = express.Router();

router.get('/api/daur-ulang', verifyToken, getAllDaurUlang);

export default router;
