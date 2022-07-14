import { Router } from 'express';
import * as certificateController from '../controllers/certificate-controller.js';

const router = Router();
router.get('/:certificate_idx', certificateController.getCertificate);
router.post('/', certificateController.newCertificate);
router.delete('/:certificate_idx', certificateController.deleteCertificate);
router.patch('/:certificate_idx', certificateController.updateCertificate);
export default router;
