import { Router } from 'express';
import deviceRouter from './DeviceRouter.js';
import typeRouter from './TypeRouter.js';
import brandRouter from './BrandRouter.js';
import userRouter from './UserRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/device', deviceRouter);
router.use('/brand', brandRouter);

export default router;