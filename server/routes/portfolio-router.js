import { Router } from 'express';
import loginrequired from '../middlewares/login-required.js';
import * as portfolioController from '../controllers/portfolio-controller.js';

const router = Router();
router.get('/', loginrequired, portfolioController.getPortfolios);
router.get('/:portfolio_idx', portfolioController.getPortfolio);
router.post('/', portfolioController.newPortfolio);
router.delete('/:portfolio_idx', portfolioController.deletePortfolio);
router.patch('/:portfolio_idx', portfolioController.updatePortfolio);
export default router;
