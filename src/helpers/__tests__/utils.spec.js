import {
  env,
  normalizePort,
  cleanData,
} from '../utils';

describe('Utils > env()', () => {
  it('should return a specific env config var', () => {
    expect(env('NODE_ENV')).toBe('test');
  });
  it('should return a default value for non-existing config', () => {
    expect(env('DUMMY_CONFIG', 'debug')).toBe('debug');
  });
  it("should return truthy value for 'true'", () => {
    process.env.TRUTHY_CONFIG = 'true';
    expect(env('TRUTHY_CONFIG')).toBeTruthy();
  });
  it("should return falsy value for 'false'", () => {
    process.env.FALSY_CONFIG = 'false';
    expect(env('FALSY_CONFIG')).toBeFalsy();
  });
  it("should return empty string value for '(empty)'", () => {
    process.env.EMPTY_CONFIG = '(empty)';
    expect(env('EMPTY_CONFIG')).toBe('');
  });
});

describe('Utils > normalizePort()', () => {
  it('should parse a given port to integer', () => {
    expect(normalizePort('8080')).toBe(8080);
  });
  it('should return false if port is below zero', () => {
    expect(normalizePort(-1)).toBe(false);
  });
  it('should return NaN for NaN value', () => {
    expect(normalizePort(NaN)).toBeNaN();
  });
});

describe('Utils > cleanData()', () => {
  it('should remove keys with null value', () => {
    const mockData = {
      type: 'cleanup',
      action: null,
    };
    expect(cleanData(mockData)).toEqual({ type: 'cleanup' });
  });
  it('should remove keys with null value for deeply nested object', () => {
    const mockData = {
      id: 1,
      email: null,
      profile: {
        name: 'John Doe',
        username: null,
      },
    };
    const expected = {
      id: 1,
      profile: { name: 'John Doe' },
    };
    expect(cleanData(mockData, true)).toEqual(expected);
  });
});
