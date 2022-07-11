import { Router } from 'express';
const ProfileRoute = Router();

import { findAll, findById } from '../controllers/profile-controller.js';

ProfileRoute.get('/', findAll);
ProfileRoute.get('/:id', findById);

export default ProfileRoute;
