import { Router } from 'express';
import * as userController from '../controllers/user-controller.js';
import loginrequired from '../middlewares/login-required.js';

const router = Router();
router.get('/:user_idx', userController.getUser);
router.delete('/:user_idx', loginrequired, userController.deleteUser);
router.patch('/:user_idx', loginrequired, userController.updateUser);
export default router;
