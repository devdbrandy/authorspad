import { Router } from 'express';
import AuthGuard from '@middlewares/authorize';
import Controller from './roles-controller';

const router = Router();

/* List of users */
router.get('/roles', AuthGuard.can('read'), Controller.getAllRoles());

/* Get a single user */
router.get('/roles/:id', AuthGuard.can('read'), Controller.getRole());

/* Create a user */
router.post('/roles', AuthGuard.can('write'), Controller.createRole());

/* Edit a user */
router.put('/roles/:id', AuthGuard.can('edit'), Controller.updateRole());

/* Delete a user */
router.delete('/roles/:id', AuthGuard.can('delete'), Controller.destroyRole());

export default router;
