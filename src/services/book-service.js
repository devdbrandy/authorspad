import models from '@database/models';
import BaseService from './base-service';

class BookService extends BaseService {
}

const { Book } = models;
export default new BookService(Book);
