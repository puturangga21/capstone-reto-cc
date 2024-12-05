import express from 'express';

import { getDetailNews } from '../controllers/detail.controller.js';
import verifyToken from '../middleware/index.js';

const router = express.Router();

router.get('/api/detail', verifyToken, getDetailNews);

export default router;
