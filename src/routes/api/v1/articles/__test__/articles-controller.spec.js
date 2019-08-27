import { articleFactory } from '@factories/article';
import controller from '../articles-controller';

const articleMock = {
  id: 1,
  title: 'Some Title',
  body: 'Article body',
  authorId: 1,
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe('ArticlesController', () => {
  it('getAllArticles() should return a list of articles', async () => {
    jest.spyOn(controller.service, 'getAll').mockResolvedValue([articleMock]);
    const getAllArticles = controller.getAllArticles();
    const expected = {
      success: true,
      data: { articles: [articleMock] },
    };

    await getAllArticles({}, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('it should catch errors', async () => {
    jest.spyOn(controller.service, 'getAll').mockRejectedValue();
    const getAllArticles = controller.getAllArticles();

    await getAllArticles({}, res, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });
  it('getArticle() should return a specific article', async () => {
    jest.spyOn(controller.service, 'getById').mockResolvedValue(articleMock);
    const req = { params: { id: 1 } };
    const getArticle = controller.getArticle();
    const expected = {
      success: true,
      data: { article: articleMock },
    };

    await getArticle(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('createArticle() should return newly created article', async () => {
    jest.spyOn(controller.service, 'create').mockResolvedValue(articleMock);
    const req = {
      body: {
        title: 'New article',
        body: 'New article body',
      },
    };
    const createArticle = controller.createArticle();
    const expected = {
      success: true,
      data: { article: articleMock },
    };

    await createArticle(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('updateArticle() should return updated article', async () => {
    const updatedArticleMock = articleFactory({ title: 'Updated title' });
    jest.spyOn(controller.service, 'update').mockResolvedValue(updatedArticleMock);
    const req = {
      body: { ...updatedArticleMock },
      params: { id: 1 },
    };
    const updateArticle = controller.updateArticle();
    const expected = {
      success: true,
      data: { article: updatedArticleMock },
    };

    await updateArticle(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expected);
  });
  it('destroyArticle() should respond with 204 no response', async () => {
    jest.spyOn(controller.service, 'delete').mockResolvedValue(1);
    const req = { params: { id: 1 } };
    const destroyArticle = controller.destroyArticle();

    await destroyArticle(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.status).toHaveBeenCalledTimes(1);
  });
});
