import { Router } from 'express';
import signup from '../controllers/auth-controller.js';
import * as validator from '../middlewares/validator.js';

const router = Router();

router.post('/signup', validator.validatorSignup, signup);

export default router;
