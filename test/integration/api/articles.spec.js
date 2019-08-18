import request from 'supertest';
import app from '@src/app';
import ArticleFactory, { articleFactory } from '@factories/article';
import UserFactory from '@factories/user';
import models from '@database/models';

const server = () => request(app);
const apiBase = '/api/v1';
let article;

beforeAll(async () => {
  const { id: authorId } = await UserFactory();
  article = await ArticleFactory(authorId);
});

afterAll(() => {
  models.sequelize.close();
});

describe('GET /articles', () => {
  it('should fetch a list of articles', (done) => {
    server()
      .get(`${apiBase}/articles`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('articles');
        expect(data.articles).toBeInstanceOf(Array);
        done();
      });
  });
});

describe('GET /articles/:id', () => {
  it('should fetch a single article resource', (done) => {
    const { id } = article;

    server()
      .get(`${apiBase}/articles/${id}`)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('article');
        expect(data.article).toHaveProperty('title', article.title);
        expect(data.article).toHaveProperty('body', article.body);
        done();
      });
  });
});

describe('POST /articles', () => {
  it('should create a new article resource', (done) => {
    const articleData = articleFactory();

    server()
      .post(`${apiBase}/articles`)
      .send(articleData)
      .expect(201)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('article');
        expect(data.article).toHaveProperty('title', articleData.title);
        expect(data.article).toHaveProperty('body', articleData.body);
        done();
      });
  });
});

describe('PUT /articles/:id', () => {
  it('should update a specific article resource', (done) => {
    const { id } = article;
    const articleData = {
      title: 'Updated title',
      body: 'Updated body',
    };

    server()
      .put(`${apiBase}/articles/${id}`)
      .send(articleData)
      .expect(200)
      .end((err, res) => {
        const { data } = res.body;

        expect(err).toBeNull();
        expect(res.body).toHaveProperty('success', true);
        expect(data).toHaveProperty('article');
        expect(data.article).toHaveProperty('title', articleData.title);
        expect(data.article).toHaveProperty('body', articleData.body);
        done();
      });
  });
});

describe('DELETE /articles/:id', () => {
  it('should delete a single article resource', (done) => {
    const { id } = article;

    server()
      .delete(`${apiBase}/articles/${id}`)
      .expect(204, done);
  });
});
