export const operatorStatusConfig = {
  active: {
    name: 'Доступен',
    className: 'active',
  },
  pause: {
    name: 'Пауза',
    className: 'pause',
  },
  dnd: {
    name: 'Не беспокоить',
    className: 'dnd',
  },
  card: {
    name: 'В карточке',
    className: 'card',
  },
  call: {
    name: 'В разговоре',
    className: 'call',
  },
  no_active: {
    name: 'Не активен',
    className: 'noActive',
  },
  incoming: {
    name: 'Ожидание ответа',
    className: 'incoming',
  },
  ringing: {
    name: 'Слушает гудки',
    className: 'ringing',
  },
} as const;

export type OperatorStatus = keyof typeof operatorStatusConfig;
