import { Router } from 'express';
import HomeController from './home-controller';

const router = Router();

/* GET homepage */
router.get('/', HomeController.index());

export default router;
