import ExceptionHandler from '@helpers/exception-handler';
import { messages } from '@helpers/constants';
import BookService from '@services/book-service';
import BaseController from '../base-controller';

const {
  RESOURCE_FOUND,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
} = messages;

/**
 * This is the main class representing BooksController
 *
 * @class BooksController
 * @extends {BaseController}
 */
class BooksController extends BaseController {
  /**
   * Fetch a list of books
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof BooksController
   */
  getAllBooks() {
    return async (req, res, next) => {
      try {
        const books = await this.service.findAll();
        this.sendResponse(res, RESOURCE_FOUND, { books });
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Fetch a specific book by `id`
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof BooksController
   */
  getBook() {
    return async (req, res, next) => {
      try {
        const { params: { id: userId } } = req;
        const book = await this.service.findById(userId);
        ExceptionHandler.throwErrorIfNull(book);
        this.sendResponse(res, RESOURCE_FOUND, { book });
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Create a new book
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof BooksController
   */
  createBook() {
    return async (req, res, next) => {
      try {
        const { body } = req;
        const book = await this.service.create(body);
        this.sendResponse(res, CREATE_SUCCESS, { book }, 201);
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Update a book resource
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof BooksController
   */
  updateBook() {
    return async (req, res, next) => {
      try {
        const {
          body,
          params: { id: bookId },
        } = req;
        await this.service.update(bookId, body);
        this.sendResponse(res, UPDATE_SUCCESS);
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Remove a specific book
   *
   * @param {object} req - Express Request object
   * @param {object} res - Express Response object
   * @param {Function} res - Express next function
   * @memberof BooksController
   */
  destroyBook() {
    return async (req, res, next) => {
      try {
        const { params: { id: bookId } } = req;
        await this.service.delete(bookId);
        this.sendResponse(res, DELETE_SUCCESS, null, 200);
      } catch (error) {
        next(error);
      }
    };
  }
}

export default new BooksController(BookService);
