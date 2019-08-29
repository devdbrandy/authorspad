import createError from 'http-errors';
import JWTService from '@services/jwt-service';
import { messages } from '@helpers/constants';

const {
  NO_AUTH_TOKEN,
  INVALID_AUTH_TOKEN,
  INVALID_TOKEN_FORMAT,
} = messages;

/**
* A middleware for validating user authentication
*
* @param {object} req - Express Request object
* @param {object} res - Express Response object
* @param {Function} next - Express NextFunction
* @returns {object} HTTP response or moves to the next middleware
* @memberof Exception
*/
const authenticate = (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    if (!accessToken) throw createError(401, NO_AUTH_TOKEN);

    if (!accessToken.startsWith('Bearer')) {
      throw createError(400, INVALID_TOKEN_FORMAT);
    }

    const [, token] = accessToken.split(' ');
    const decoded = JWTService.verify(token);

    if (!decoded) {
      throw createError(401, INVALID_AUTH_TOKEN);
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
