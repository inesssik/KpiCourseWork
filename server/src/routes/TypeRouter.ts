import TypeController from '../controllers/TypeController.js';

import { Router } from 'express';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();

router.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);

export default router;