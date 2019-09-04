import Exception from '@helpers/exception';
import ArticleService from '@services/article-service';
import BaseController from '../base-controller';

/**
 * This is the main class representing ArticleController
 *
 * @class ArticleController
 * @extends {BaseController}
 */
class ArticleController extends BaseController {
  /**
   * Fetch a list of articles
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ArticleController
   */
  getAllArticles() {
    return this.asyncWrapper(async (req, res) => {
      const articles = await this.service.getAll();
      this.sendResponse(res, { articles });
    });
  }

  /**
   * Fetch a single article by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ArticleController
   */
  getArticle() {
    return this.asyncWrapper(async (req, res) => {
      const { params: { id: articleId } } = req;
      const article = await this.service.getById(articleId);
      Exception.throwErrorIfNull(article);
      this.sendResponse(res, { article });
    });
  }

  /**
   * Create a new article
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ArticleController
   */
  createArticle() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { userId },
      } = req;
      body.authorId = userId;
      const article = await this.service.create(body);

      this.sendResponse(res, { article }, undefined, 201);
    });
  }

  /**
   * Update an article resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ArticleController
   */
  updateArticle() {
    return this.asyncWrapper(async (req, res) => {
      const {
        body,
        params: { id: articleId },
      } = req;
      const article = await this.service.update(articleId, body);
      this.sendResponse(res, { article });
    });
  }

  /**
   * Remove a specific article
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof ArticleController
   */
  destroyArticle() {
    return this.asyncWrapper(async (req, res) => {
      const { locals: { article } } = res;
      await article.destroy();
      this.sendResponse(res, null, null, 204);
    });
  }
}

export default new ArticleController(ArticleService);
