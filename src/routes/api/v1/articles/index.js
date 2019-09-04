import { Router } from 'express';
import AuthGuard from '@middlewares/authorize';
import Controller from './articles-controller';

const router = Router({ mergeParams: true });
const isOwner = Controller.isOwnerPolicy('article');

/* List of articles */
router.get('/articles', Controller.getAllArticles());
/* Get a single article */
router.get('/articles/:id', Controller.getArticle());
/* Create an article */
router.post('/articles', AuthGuard.can([{ role: 'user' }]), Controller.createArticle());
/* Edit an article */
router.put('/articles/:id', AuthGuard.can([{ when: isOwner }]), Controller.updateArticle());
/* Delete an article */
router.delete(
  '/articles/:id',
  AuthGuard.can([{ when: isOwner }]),
  Controller.destroyArticle(),
);

export default router;
