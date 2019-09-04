import faker from 'faker';
import models from '@database/models';


/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * @typedef {Object} Article
 * @property {string} title - The article title
 * @property {string} body - The article body
 * @property {string} authorId - The article's author unique identifier
 */


/**
 * Generates an article object with default attributes
 * @param {Article} [props={}] - The article properties
 */
export const articleFactory = (authorId, props = {}) => {
  const defaultProps = {
    title: faker.company.catchPhrase(),
    body: faker.lorem.paragraphs(),
    authorId,
  };
  return Object.assign({}, defaultProps, props);
};

/**
 * Generates an article model instance with default attributes
 * @param {Article} [props={}] - The user properties
 * @returns {Model|Article}
 */
export default async (authorId, props) => {
  const result = await models.Article.create(articleFactory(authorId, props));

  const article = result.get({ plain: true });
  delete article.deletedAt;
  return article;
};
