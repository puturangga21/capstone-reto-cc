import express from 'express';

import { getNonOrganic } from '../controllers/non-organik.controller.js';

const router = express.Router();

router.get('/api/non-organik', getNonOrganic);

export default router;
