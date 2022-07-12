import { Router } from 'express';
import * as educationController from '../controllers/education-controller.js';

const router = Router();
router.get('/:education_idx', educationController.getEducation);
router.post('/', educationController.newEducation);
router.delete('/:education_idx', educationController.deleteEducation);
router.patch('/:education_idx', educationController.updateEducation);
export default router;
