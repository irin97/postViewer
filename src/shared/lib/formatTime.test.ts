import { formatTime } from './formatTime';

describe('formatTime', () => {
  test('Форматирует часы, минуты и секунды', () => {
    expect(formatTime(0, 3661000)).toBe('01:01:01');
  });

  test('Возвращает время меньше минуты', () => {
    expect(formatTime(0, 9000)).toBe('00:00:09');
  });

  test('Форматирует ровно минуту', () => {
    expect(formatTime(0, 60000)).toBe('00:01:00');
  });

  test('Форматирует ровно час', () => {
    expect(formatTime(0, 3600000)).toBe('01:00:00');
  });

  test('Отбрасывает дробную часть секунд', () => {
    expect(formatTime(100, 0)).toBe('00:00:00');
  });

  test('Округляет миллисекунды вниз', () => {
    expect(formatTime(0, 1999)).toBe('00:00:01');
  });
});
