import { getApiErrorMessage } from './getApiErrorMessage';

describe('getApiErrorMessage', () => {
  test('Возвращает message из ошибки API', () => {
    const apiError = {
      data: {
        message: 'Ошибка API',
      },
      status: 404,
    };

    expect(getApiErrorMessage(apiError)).toBe('Ошибка API');
  });

  test('Возвращает message обычной ошибки', () => {
    const error = new Error('Обычная ошибка');

    expect(getApiErrorMessage(error)).toBe('Обычная ошибка');
  });

  test('Возвращает пустую строку для неизвестной ошибки', () => {
    expect(getApiErrorMessage(null)).toBe('');
  });
});
