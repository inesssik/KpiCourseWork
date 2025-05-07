import { Router } from 'express';
const router = Router();

// router.post('/registration',);
// router.post('/login', );
router.get('/auth', (req, res) => {
    res.json({message: 'ALL WORKING'});
});

export default router;