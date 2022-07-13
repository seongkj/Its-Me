import { Router } from 'express';
import * as skiilController from '../controllers/skill-controller.js';

const router = Router();
router.get('/:skill_idx', skiilController.getSkill);
router.post('/', skiilController.newSkill);
router.delete('/:skill_idx', skiilController.deleteSkill);
router.patch('/:skill_idx', skiilController.updateSkill);
export default router;
