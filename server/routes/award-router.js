import { Router } from 'express';
import * as awardController from '../controllers/award-controller.js';

const router = Router();
router.get('/:award_idx', awardController.getAward);
router.post('/', awardController.newAward);
router.delete('/:award_idx', awardController.deleteAward);
router.patch('/:award_idx', awardController.updateAward);
export default router;
