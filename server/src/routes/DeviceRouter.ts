import { Router } from 'express';
import DeviceController from '../controllers/DeviceController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';
const router = Router();

router.post('/', authMiddleware, checkRoleMiddleware('ADMIN'), DeviceController.create);
router.delete('/', authMiddleware, checkRoleMiddleware('ADMIN'), DeviceController.delete);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);

export default router;