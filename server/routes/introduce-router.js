import { Router } from 'express';
import * as introduceController from '../controllers/introduce-controller.js';
const router = Router();
router.get('/:introduce_idx', introduceController.getIntroduce);
router.post('/', introduceController.newIntroduce);
router.delete('/:introduce_idx', introduceController.deleteIntroduce);
router.patch('/:introduce_idx', introduceController.updateIntroduce);
export default router;
