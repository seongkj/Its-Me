import { Router } from 'express';
import * as languageController from '../controllers/language-controller.js';

const router = Router();
router.get('/:language_idx', languageController.getLanguage);
router.post('/', languageController.newLanguage);
router.delete('/:language_idx', languageController.deleteLanguage);
router.patch('/:language_idx', languageController.updateLanguage);
export default router;
