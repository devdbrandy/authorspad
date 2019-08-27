import createError from 'http-errors';
import JWTService from '@services/jwt-service';

const authenticate = (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    if (!accessToken) throw createError(401, 'Access denied. No token provided.');

    if (!accessToken.startsWith('Bearer')) {
      throw createError(400, 'Authorization token must be in the format: Bearer <token>.');
    }

    const [, token] = accessToken.split(' ');
    const decoded = JWTService.verify(token);

    if (!decoded) {
      throw createError(401, 'Authentication failure: Invalid or expired token.');
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
