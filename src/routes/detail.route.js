import express from 'express';

import { getDetailNews } from '../controllers/detail.controller.js';

const router = express.Router();

router.get('/api/detail', getDetailNews);

export default router;
