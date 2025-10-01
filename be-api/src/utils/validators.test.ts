import { describe, expect, test } from 'vitest';

import { checkValidStringToInteger } from 'src/utils/validators';

describe('checkValidStringToInteger', () => {
  test('Numeric value is not integer, return false', () => {
    const result = checkValidStringToInteger(3.5);

    expect(result).toBeFalsy();
  });

  test('String value is not integer, return false', () => {
    const result = checkValidStringToInteger('3.5');

    expect(result).toBeFalsy();
  });

  test('String value is not number, return false', () => {
    const result = checkValidStringToInteger('test');

    expect(result).toBeFalsy();
  });

  test('String value is more than a PG_MAX_SAFE_INTEGER, return false', () => {
    const result = checkValidStringToInteger('10000000000');

    expect(result).toBeFalsy();
  });

  test('Numeric value is more than a PG_MAX_SAFE_INTEGER, return false', () => {
    const result = checkValidStringToInteger(10000000000);

    expect(result).toBeFalsy();
  });

  test('Integer in array of strings incorrect, return false', () => {
    const result = checkValidStringToInteger(['1000', '3.5']);

    expect(result).toBeFalsy();
  });

  test('Integer in array of numbers incorrect, return false', () => {
    const result = checkValidStringToInteger([1000, 3.5]);

    expect(result).toBeFalsy();
  });

  test('Numeric value is correct, return true', () => {
    const result = checkValidStringToInteger(1000);

    expect(result).toBeTruthy();
  });

  test('String value is correct, return true', () => {
    const result = checkValidStringToInteger('1000');

    expect(result).toBeTruthy();
  });

  test('Integer in array of strings is correct, return true', () => {
    const result = checkValidStringToInteger(['1000', '200']);

    expect(result).toBeTruthy();
  });

  test('Integer in array of numbers is correct, return true', () => {
    const result = checkValidStringToInteger([1000, 200]);

    expect(result).toBeTruthy();
  });
});
