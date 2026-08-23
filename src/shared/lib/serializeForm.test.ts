import { serializeForm } from './serializeForm';

describe('serializeForm', () => {
  test('Не добавляет null и undefined в параметры', () => {
    expect(serializeForm({ name: null, age: undefined }).toString()).toBe('');
  });

  test('Сериализует простые значения', () => {
    expect(serializeForm({ name: 'Иван', age: 17, call: false }).toString()).toBe(
      'name=%D0%98%D0%B2%D0%B0%D0%BD&age=17&call=false',
    );
  });

  test('Сериализует массивы', () => {
    expect(serializeForm({ calls: [1, 2, 3] }).toString()).toBe('calls=1&calls=2&calls=3');
  });

  test('Сериализует вложенные объекты', () => {
    expect(serializeForm({ user: { name: 'Peter', age: 17 } }).toString()).toBe(
      'user%5Bname%5D=Peter&user%5Bage%5D=17',
    );
  });
});
