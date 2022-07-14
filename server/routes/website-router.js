import { Router } from 'express';
import * as websiteController from '../controllers/website-controller.js';

const router = Router();
router.get('/:website_idx', websiteController.getWebSite);
router.post('/', websiteController.newWebSite);
router.delete('/:website_idx', websiteController.deleteWebSite);
router.patch('/:website_idx', websiteController.updateWebSite);
export default router;
