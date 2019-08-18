import { Router } from 'express';
import controller from './articles-controller';

const router = Router();

/* List of articles */
router.get('/articles', controller.getAllArticles());
/* Get a single article */
router.get('/articles/:id', controller.getArticle());
/* Create an article */
router.post('/articles', controller.createArticle());
/* Edit an article */
router.put('/articles/:id', controller.updateArticle());
/* Delete an article */
router.delete('/articles/:id', controller.destroyArticle());

export default router;
