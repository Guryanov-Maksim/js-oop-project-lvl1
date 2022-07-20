import Validator from '../index.js';

test('string, required', () => {
  const v = new Validator();
  const schema = v.string();

  expect(schema.isValid('')).toBe(true);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid()).toBe(true);

  schema.required();
  expect(schema.isValid('not empty string')).toBe(true);
  expect(schema.isValid('')).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid()).toBe(false);
});

test('string, minLength', () => {
  const v = new Validator();
  const schema = v.string();

  schema.minLength(3);
  expect(schema.isValid('')).toBe(false);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid()).toBe(false);
  expect(schema.isValid('ab')).toBe(false);
  expect(schema.isValid('abc')).toBe(true);
  expect(schema.isValid('adcdef')).toBe(true);
});

test('string, contains', () => {
  const v = new Validator();
  const schema = v.string();

  schema.contains('what');
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid()).toBe(false);
  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('does the fox say')).toBe(false);

  schema.contains('does');
  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('what the fox say')).toBe(false);

  schema.contains('whatthe');
  expect(schema.isValid('what does the fox say')).toBe(false);
});

test('string, several checks', () => {
  const v = new Validator();
  const schema = v.string();
  const str = 'what does the fox say';

  schema.minLength(str.length);
  schema.contains('what');
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid()).toBe(false);
  expect(schema.isValid('what does the fox say')).toBe(true);
  expect(schema.isValid('does the fox say')).toBe(false);
  expect(schema.isValid('that does the fox say')).toBe(false);
});
