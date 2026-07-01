import { type OperatorStatus, operatorStatusConfig } from '../config/operatorStatus';

function isOperatorStatus(status: string): status is OperatorStatus {
  return status in operatorStatusConfig;
}

export const getOperatorStatus = (status: string) => {
  return isOperatorStatus(status)
    ? operatorStatusConfig[status]
    : {
        name: 'Не определен',
        className: 'noActive',
      };
};
