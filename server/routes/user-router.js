import { Router } from 'express';
import * as userController from '../controllers/user-controller.js';

const router = Router();
router.get('/:user_idx', userController.getUser);
router.delete('/:user_idx', userController.deleteUser);
router.patch('/:user_idx', userController.updateUser);
export default router;
