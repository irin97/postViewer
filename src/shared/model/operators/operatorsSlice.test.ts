import {
  deleteOperator,
  operatorsReducer,
  setCountActiveCalls,
  setOperators,
  setQueueCallsCount,
  updateOperator,
} from './operatorsSlice';

const state = {
  operators: [
    {
      id: 16,
      fullName: 'Иван Иванов',
      startStatusTimestamp: 1,
      status: 'pause',
    },
  ],
  queueCallsCount: 0,
  countActiveCalls: 0,
};

describe('operatorsReducer', () => {
  test('Изменение звонков в очереди', () => {
    const newState = operatorsReducer(state, setQueueCallsCount(10));
    expect(newState.queueCallsCount).toBe(10);
  });

  test('Изменение очереди активных звонков', () => {
    const newState = operatorsReducer(state, setCountActiveCalls(5));
    expect(newState.countActiveCalls).toBe(5);
  });

  test('Установка списка операторов', () => {
    const newState = operatorsReducer(
      state,
      setOperators([
        {
          id: 16,
          fullName: 'Иван Иванов',
          startStatusTimestamp: 1,
          status: 'card',
        },
      ]),
    );
    expect(newState.operators).toEqual([
      {
        id: 16,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'card',
      },
    ]);
  });

  test('Обновление существующего оператора', () => {
    const newState = operatorsReducer(
      state,
      updateOperator({
        id: 16,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'active',
      }),
    );
    expect(newState.operators).toEqual([
      {
        id: 16,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'active',
      },
    ]);
  });

  test('Обновление отсутствующего оператора', () => {
    const newState = operatorsReducer(
      state,
      updateOperator({
        id: 17,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'active',
      }),
    );
    expect(newState.operators).toEqual([
      {
        id: 16,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'pause',
      },
      {
        id: 17,
        fullName: 'Иван Иванов',
        startStatusTimestamp: 1,
        status: 'active',
      },
    ]);
  });

  test('Удаление оператора', () => {
    const newState = operatorsReducer(state, deleteOperator(16));
    expect(newState.operators).toEqual([]);
  });
});
