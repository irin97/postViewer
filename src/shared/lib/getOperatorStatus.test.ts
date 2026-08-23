import { getOperatorStatus } from './getOperatorStatus';

describe('getOperatorStatus', () => {
  test('Статус есть в конфиге', () => {
    expect(getOperatorStatus('active')).toEqual({
      name: 'Доступен',
      className: 'active',
    });
  });

  test('Статуса нет в конфиге', () => {
    expect(getOperatorStatus('undefined')).toEqual({
      name: 'Не определен',
      className: 'noActive',
    });
  });
});
