import { Router } from 'express';
import * as websiteController from '../controllers/website-controller.js';
import { upload, s3 } from '../utils/s3.js';
const router = Router();
router.get('/:website_idx', websiteController.getWebSite);
router.post('/', upload.single('img'), websiteController.newWebSite);
router.delete('/:website_idx', websiteController.deleteWebSite);
router.patch('/:website_idx', websiteController.updateWebSite);
export default router;
