import { server, apiBase, auth } from '@test/support';
import models from '@database/models';
import ArticleFactory, { articleFactory } from '@factories/article';
import { build as newUserInstance } from '@factories/user';
import RoleFactory from '@factories/role';

let article;
let author;
let authToken;

beforeAll(async () => {
  const user = await newUserInstance({ isVerified: true }).save();

  // create and assign role/permission to user
  const writerRole = await RoleFactory({
    name: 'writer',
    ownership: true,
    permissions: [
      { scope: 'article:write' },
      { scope: 'article:edit' },
      { scope: 'article:delete' },
    ],
  });
  await user.addRole(writerRole);

  author = user.get();
  const { id: authorId, username } = author;

  article = await ArticleFactory(authorId);
  authToken = await auth({ username, password: 'secret' });
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
      .set('Authorization', `Bearer ${authToken}`)
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
      .set('Authorization', `Bearer ${authToken}`)
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
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
});

describe('DELETE /users/:userId/articles/:id', () => {
  let mockArticle;

  beforeAll(async () => {
    mockArticle = await ArticleFactory(author.id);
  });

  it('should delete a single article resource by userId', (done) => {
    const { id } = mockArticle;
    const { id: userId } = author;

    server()
      .delete(`${apiBase}/users/${userId}/articles/${id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(204, done);
  });
  it('should handle error occurence', (done) => {
    const { id: userId } = author;

    server()
      .delete(`${apiBase}/users/${userId}/articles/1000`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404, done);
  });
});
