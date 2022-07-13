import { Router } from 'express';
import * as careerController from '../controllers/career-controller.js';

const router = Router();
router.get('/:career_idx', careerController.getCareer);
router.post('/', careerController.newCareer);
router.delete('/:career_idx', careerController.deleteCareer);
router.patch('/:career_idx', careerController.updateCareer);
export default router;
