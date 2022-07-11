import { Router } from 'express';
import getUser from '../controllers/user-controller.js';

const router = Router();
router.get('/:user_idx', getUser);
//router.delete('/:user_idx', userController.deleteUser);
export default router;
