import { Router } from 'express';
import BrandController from '../controllers/BrandController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const router = Router();

router.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), BrandController.create);
router.get('/', BrandController.getAll);

export default router;