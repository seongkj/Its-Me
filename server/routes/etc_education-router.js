import { Router } from 'express';
import * as etc_educationController from '../controllers/etc-controller.js';

const router = Router();
router.get('/:etc_education_idx', etc_educationController.getEtc_education);
router.post('/', etc_educationController.newEtc_education);
router.delete(
  '/:etc_education_idx',
  etc_educationController.deleteEtc_education
);
router.patch(
  '/:etc_education_idx',
  etc_educationController.updateEtc_education
);
export default router;
