import { Router } from 'express';
import controller from './users-controller';

const router = Router();

/* GET users listing */
router.get('/users', controller.getAllUsers());
/* GET user */
router.get('/user/:id', controller.getUser());
/* POST user */
router.post('/user', controller.createUser());
/* PUT user */
router.put('/user/:id', controller.updateUser());
/* DELETE user */
router.delete('/user/:id', controller.destroyUser());

export default router;
