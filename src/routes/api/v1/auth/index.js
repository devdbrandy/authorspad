import { Router } from 'express';
import authenticate from '@middlewares/authenticate';
import controller from './auth-controller';

const router = Router();

/* Authenticate user */
router.post('/auth/login', controller.login());
/* Get authenticated user profile */
router.get('/me', authenticate, controller.profile());

export default router;
