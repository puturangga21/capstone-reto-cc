import express from 'express';

import { getAllOrganic } from '../controllers/organik.controller.js';
import verifyToken from '../middleware/index.js';

const router = express.Router();

router.get('/api/organik', verifyToken, getAllOrganic);

export default router;