import { Router } from 'express';
import * as portfolioController from '../controllers/portfolio-controller.js';

const router = Router();
router.get('/:portfolio_idx', portfolioController.getPortfolio);
router.post('/', portfolioController.newPortfolio);
router.delete('/:portfolio_idx', portfolioController.deletePortfolio);
router.patch('/:portfolio_idx', portfolioController.updatePortfolio);
export default router;
