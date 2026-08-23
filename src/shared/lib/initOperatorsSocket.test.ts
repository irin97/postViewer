import {
  deleteOperator,
  setCountActiveCalls,
  setOperators,
  setQueueCallsCount,
  updateOperator,
} from '../model/operators/operatorsSlice';
import { initOperatorsSocket } from './initOperatorsSocket';

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static instanceCount = 0;

  constructor() {
    MockWebSocket.instanceCount++;
  }

  readyState = MockWebSocket.OPEN;
  send = jest.fn();

  onopen = null;
  onmessage = null;
  onclose = null;
}

const dispatch = jest.fn();

describe('initOperatorsSocket', () => {
  jest.useFakeTimers();

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  globalThis.WebSocket = MockWebSocket as unknown as typeof WebSocket;
  const mockSocket = initOperatorsSocket(dispatch);

  if (!mockSocket) {
    throw new Error('WebSocket не был создан');
  }

  test('При успешном подключении отправляется FILTER', () => {
    mockSocket.onopen?.(new Event('open'));
    expect(mockSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'filter',
        data: {
          activeTab: 'operators',
          userRole: 'ROLE_ADMIN',
          userId: '80',
          userIds: [],
          queues: [],
          showActiveCallsByCampaign: false,
          showDialingContactsByCampaign: false,
        },
      }),
    );
  });

  describe('Обработка входящих сообщений', () => {
    beforeEach(() => {
      dispatch.mockClear();
    });

    test('Количество звонков в очереди', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'count_queue_calls',
            data: {
              count: 10,
            },
          }),
        }),
      );

      expect(dispatch).toHaveBeenCalledWith(setQueueCallsCount(10));
    });

    test('Количество активных звонков', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'count_active_calls',
            data: {
              count: 15,
            },
          }),
        }),
      );

      expect(dispatch).toHaveBeenCalledWith(setCountActiveCalls(15));
    });

    test('Добавление всех операторов', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'all_members',
            data: [
              {
                id: 16,
                fullName: 'Иван Иванов',
                startStatusTimestamp: 1,
                status: 'card',
              },
            ],
          }),
        }),
      );

      expect(dispatch).toHaveBeenCalledWith(
        setOperators([
          {
            id: 16,
            fullName: 'Иван Иванов',
            startStatusTimestamp: 1,
            status: 'card',
          },
        ]),
      );
    });

    test('Изменение оператора', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'update_member',
            data: {
              id: 16,
              fullName: 'Иван Иванов',
              startStatusTimestamp: 1,
              status: 'pause',
            },
          }),
        }),
      );

      expect(dispatch).toHaveBeenCalledWith(
        updateOperator({
          id: 16,
          fullName: 'Иван Иванов',
          startStatusTimestamp: 1,
          status: 'pause',
        }),
      );
    });

    test('Удаление оператора', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'delete_member',
            data: {
              id: 18,
            },
          }),
        }),
      );

      expect(dispatch).toHaveBeenCalledWith(deleteOperator(18));
    });

    test('Игнорирует неизвестный тип сообщения', () => {
      mockSocket.onmessage?.(
        new MessageEvent('message', {
          data: JSON.stringify({
            type: 'unknown',
            data: 'someData',
          }),
        }),
      );

      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  test('Переподключение при закрытии', () => {
    mockSocket.onclose?.(new CloseEvent('close'));
    expect(MockWebSocket.instanceCount).toEqual(1);
    jest.advanceTimersByTime(3000);
    expect(MockWebSocket.instanceCount).toEqual(2);
  });

  test('Не создаёт несколько таймеров переподключения', () => {
    mockSocket.onclose?.(new CloseEvent('close'));
    mockSocket.onclose?.(new CloseEvent('close'));
    expect(jest.getTimerCount()).toBe(1);
  });
});
