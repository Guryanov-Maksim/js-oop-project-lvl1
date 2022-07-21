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

test('number, required', () => {
  const v = new Validator();
  const schema = v.number();

  expect(schema.isValid('')).toBe(false);
  expect(schema.isValid(null)).toBe(true);
  expect(schema.isValid()).toBe(false);

  schema.required();
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(5)).toBe(true);
  expect(schema.isValid(-5)).toBe(true);
});

test('number, positive', () => {
  const v = new Validator();
  const schema = v.number();

  schema.positive();
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(-1)).toBe(false);
  expect(schema.isValid(0)).toBe(true);
  expect(schema.isValid(1)).toBe(true);
});

test('number, range', () => {
  const v = new Validator();
  const schema1 = v.number();

  schema1.range(0, 10);
  expect(schema1.isValid(null)).toBe(false);
  expect(schema1.isValid(-1)).toBe(false);
  expect(schema1.isValid(0)).toBe(true);
  expect(schema1.isValid(5)).toBe(true);
  expect(schema1.isValid(10)).toBe(true);
  expect(schema1.isValid(11)).toBe(false);

  const schema2 = v.number();
  schema2.range(-5, 5);
  expect(schema2.isValid(-6)).toBe(false);
  expect(schema2.isValid(-5)).toBe(true);
  expect(schema2.isValid(-4)).toBe(true);
  expect(schema2.isValid(0)).toBe(true);
  expect(schema2.isValid(4)).toBe(true);
  expect(schema2.isValid(5)).toBe(true);
  expect(schema2.isValid(6)).toBe(false);

  const schema3 = v.number();
  schema3.range(-10, -5);
  expect(schema3.isValid(-11)).toBe(false);
  expect(schema3.isValid(-10)).toBe(true);
  expect(schema3.isValid(-5)).toBe(true);
  expect(schema3.isValid(-4)).toBe(false);
  expect(schema3.isValid(0)).toBe(false);
});

test('number, several checks', () => {
  const v = new Validator();
  const schema = v.number();

  schema.required().positive().range(1, 10);
  expect(schema.isValid(null)).toBe(false);
  expect(schema.isValid(-1)).toBe(false);
  expect(schema.isValid(0)).toBe(false);
  expect(schema.isValid(1)).toBe(true);
  expect(schema.isValid(5)).toBe(true);
  expect(schema.isValid(10)).toBe(true);
  expect(schema.isValid(11)).toBe(false);
});
