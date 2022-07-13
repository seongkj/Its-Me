import { Router } from 'express';
import * as authController from '../controllers/auth-controller.js';
import * as validator from '../middlewares/validator.js';

const router = Router();

router.post('/signup', validator.validatorSignup, authController.signup);
router.post('/login', validator.validatorLogin, authController.login);

export default router;
