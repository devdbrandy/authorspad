import { Router } from 'express';
import controller from './books-controller';

const router = Router();

/* GET books listing */
router.get('/books', controller.getAllBooks());
/* GET user */
router.get('/book/:id', controller.getBook());
/* POST book */
router.post('/book', controller.createBook());
/* PUT book */
router.put('/book/:id', controller.updateBook());
/* DELETE book */
router.delete('/book/:id', controller.destroyBook());

export default router;
