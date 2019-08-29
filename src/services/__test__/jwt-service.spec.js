import jwt from 'jsonwebtoken';
import JWTService from '../jwt-service';

describe('JWTService', () => {
  it('<sign> should ', () => {
    const result = JWTService.sign({});
    expect(result.split('.')).toHaveLength(3);
  });
  it('<verify> should verify given token and return a decoded token', () => {
    const mockToken = JWTService.sign({ username: 'johnd' });
    const result = JWTService.verify(mockToken);
    expect(result).toHaveProperty('username', 'johnd');
  });
  it('<verify> should return false when it encounters failure', () => {
    const result = JWTService.verify();
    jest.spyOn(jwt, 'verify').mockRejectedValue();
    expect(result).toBeFalsy();
  });
  it('<decode> should return decoded payload', () => {
    const mockToken = JWTService.sign({ username: 'johnd' });
    const result = JWTService.decode(mockToken);
    expect(result.payload).toHaveProperty('username', 'johnd');
  });
});
