import faker from 'faker';
import models from '@database/models';

const { Article } = models;

/**
 * Generates a user object with default attributes
 *
 * @param {number} authorId - The author of the article
 * @param {object} [props={}] - The article properties
 * @param {string} props.title - The article title
 * @param {string} props.body - The article body
 * @param {number} props.authorId - The article author unique identifier
 * @returns {{
 *    title: string,
 *    body: string,
 *    authorId: number,
 * }} An article object
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
* Generates a user object with default attributes
*
* @param {number} authorId - The author of the article
* @param {object} [props={}] - The article properties
* @param {string} props.title - The article title
* @param {string} props.body - The article body
* @param {number} props.authorId - The article author unique identifier
* @returns {{
 *    title: string,
 *    body: string,
 *    authorId: number,
 * }} An article object
 */
export default async (authorId, props) => {
  const result = await Article.create(articleFactory(authorId, props));

  const article = result.get({ plain: true });
  delete article.deletedAt;
  return article;
};
