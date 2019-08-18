import { Router } from 'express';
import controller from './users-controller';

const router = Router();

/* List of users */
router.get('/users', controller.getAllUsers());
/* Get a single user */
router.get('/users/:id', controller.getUser());
/* Create a user */
router.post('/users', controller.createUser());
/* Edit a user */
router.put('/users/:id', controller.updateUser());
/* Delete a user */
router.delete('/users/:id', controller.destroyUser());

export default router;
