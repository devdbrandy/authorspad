import { Router } from 'express';
import HomeController from './HomeController';

const router = Router();

/* GET homepage */
router.get('/', HomeController.index);

export default router;
