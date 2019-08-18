import models from '@database/models';
import BaseService from './base-service';

class ArticleService extends BaseService {
}

const { Article } = models;
export default new ArticleService(Article);
