import UserController from '../controllers/UserController.js';

import { Router } from 'express';
const router = Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.get('/auth', UserController.check);

export default router;