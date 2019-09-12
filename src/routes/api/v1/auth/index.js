import { Router } from 'express';
import AuthGuard from '@middlewares/authorize';
import Controller from './auth-controller';

const router = Router();

/* Authenticate user */
router.post('/auth/login', Controller.login());

/* Get authenticated user profile */
router.get('/me', AuthGuard.can('read'), Controller.profile());

export default router;
