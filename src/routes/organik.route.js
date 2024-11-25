import express from 'express';

import { getAllOrganic } from '../controllers/organik.controller.js';

const router = express.Router();

router.get('/api/organik', getAllOrganic);

export default router;
