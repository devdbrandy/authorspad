import jwt from 'jsonwebtoken';
import { env } from '@helpers/utils';

/**
 * JWT Service Module
 *
 * @export
 * @class JWTService
 */
export default class JWTService {
  /**
   * Synchronously sign the given payload into a JSON Web Token string payload
   *
   * @static
   * @param {object} payload - Payload to sign
   * @param {object} opts - Options for signature
   * @returns {string} A JSON Web Token string
   * @memberof JWTService
   */
  static sign(payload, opts = {}) {
    const privateKey = Buffer.from(env('APP_PKEY', 'secret'), 'base64').toString('ascii');
    const options = {
      issuer: env('APP_NAME', ''),
      audience: env('APP_URL', ''),
      expiresIn: '12h',
      algorithm: 'RS256',
      ...opts,
    };

    return jwt.sign(payload, privateKey, options);
  }

  /**
   * Synchronously verify given token and return a decoded token
   *
   * @static
   * @param {string} token - JWT string to verify
   * @param {object} opts - Options for the verification
   * @returns {object|boolean} Decoded token payload or false for invalid token
   * @memberof JWTService
   */
  static verify(token, opts) {
    const publicKEY = Buffer.from(env('APP_PUB_KEY', 'secret'), 'base64').toString('ascii');
    const options = {
      issuer: env('APP_NAME', ''),
      audience: env('APP_URL', ''),
      expiresIn: '12h',
      algorithm: ['RS256'],
      ...opts,
    };

    try {
      return jwt.verify(token, publicKEY, options);
    } catch (err) {
      return false;
    }
  }

  /**
   * A wrapper that returns the decoded payload without verifying if the signature is valid
   *
   * @static
   * @param {string} token - JWT string to decode
   * @returns {object} The decoded payload
   * @memberof JWTService
   */
  static decode(token) {
    return jwt.decode(token, { complete: true });
  }
}
