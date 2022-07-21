import { Router } from 'express';
import * as userController from '../controllers/user-controller.js';
import loginrequired from '../middlewares/login-required.js';
import { upload, s3 } from '../utils/s3.js';

const router = Router();
router.get('/:user_idx', userController.getUser);
router.delete('/:user_idx', loginrequired, userController.deleteUser);
router.patch(
  '/:user_idx',
  loginrequired,
  upload.single('img'),
  userController.updateUser
);
router.post('/reset-password', userController.resetPassword);
router.post('/update-password', loginrequired, userController.updatePassword);
export default router;

// 이메일
