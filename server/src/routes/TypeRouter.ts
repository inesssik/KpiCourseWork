import TypeController from '../controllers/TypeController.js';

import { Router } from 'express';
const router = Router();

router.post('/', TypeController.create);
router.get('/', TypeController.getAll);

export default router;