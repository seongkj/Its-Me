import { Router } from 'express';
import * as profileController from '../controllers/profile-controller.js';

const router = Router();
router.get('/:profile_idx', profileController.getProfile);
router.post('/', profileController.newProfile);
router.delete('/:profile_idx', profileController.deleteProfile);
router.patch('/:profile_idx', profileController.updateProfile);
export default router;
