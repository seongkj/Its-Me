import { Router } from 'express';
import * as authController from '../controllers/auth-controller.js';
const router = Router();
router.post('/signup', validator.validateSignup, authController.signup);
