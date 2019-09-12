import { Router } from 'express';
import AuthGuard from '@middlewares/authorize';
import Controller from './users-controller';
import articlesRouter from '../articles';

const router = Router();
// const isOwner = Controller.isOwnerPolicy('user');

/* List of users */
router.get('/users', Controller.getAllUsers());

/* Get a single user */
router.get('/users/:id', Controller.getUser());

/* Create a user */
router.post('/users', Controller.createUser());

/* Edit a user */
router.put('/users/:id', AuthGuard.can('user:edit'), Controller.updateUser());

/* Delete a user */
router.delete('/users/:id', AuthGuard.can('user:delete'), Controller.destroyUser());

/* User articles resource */
router.use('/users/:userId/', articlesRouter);

export default router;
