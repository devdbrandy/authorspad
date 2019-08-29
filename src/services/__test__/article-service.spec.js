import ArticleFactory, { articleFactory } from '@factories/article';
import UserFactory from '@factories/user';
import models from '@database/models';
import ArticleService from '../article-service';
import BaseService from '../base-service';

const { Model } = models.Sequelize;
let article;

beforeAll(async () => {
  const { id: authorId } = await UserFactory();
  article = await ArticleFactory(authorId);
});

afterAll(() => {
  models.sequelize.close();
});

describe('ArticleService Integration', () => {
  it('should extend BaseService', () => {
    expect(ArticleService).toBeInstanceOf(BaseService);
  });
});

describe('ArticleService > getAll()', () => {
  it('should return the list of article objects', async () => {
    const result = await ArticleService.getAll({ plain: true });
    expect(result).toBeInstanceOf(Array);
  });
  it('should return the list of article instances', async () => {
    const [result] = await ArticleService.getAll();
    expect(result).toBeInstanceOf(Model);
  });
});

describe('ArticleService > getById()', () => {
  it('should return a single article object by id', async () => {
    const { id } = article;
    const result = await ArticleService.getById(id, { plain: true });
    expect(result).toEqual(article);
  });
  it('should return a single article instance by id', async () => {
    const { id } = article;
    const result = await ArticleService.getById(id);
    expect(result).toBeInstanceOf(Model);
  });
});

describe('ArticleService > create()', () => {
  it('should return newly created article', async () => {
    const articleData = articleFactory();
    const result = await ArticleService.create(articleData);
    expect(result.title).toEqual(articleData.title);
    expect(result.body).toEqual(articleData.body);
  });
});

describe('ArticleService > update()', () => {
  it('should return updated article', async () => {
    const { id } = article;
    const result = await ArticleService.update(id, { title: 'Updated title' });
    expect(result.title).toEqual('Updated title');
  });
});

describe('ArticleService > delete()', () => {
  it('should return true if article is deleted', async () => {
    const { id } = article;
    const result = await ArticleService.delete(id);
    expect(result).toBeTruthy();
  });
});
