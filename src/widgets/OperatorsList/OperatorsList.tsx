import { useEffect, useState } from 'react';
import { useAppSelector } from '@/app/store/hooks';
import icon from '@/assets/operatorsIcon.png';
import { OperatorsItem } from '../OperatorsItem/OperatorsItem';
import styles from './OperatorsList.module.scss';

export const OperatorsList = () => {
  const queueCalls = useAppSelector((state) => state.operators.queueCallsCount);
  const activeCalls = useAppSelector((state) => state.operators.countActiveCalls);
  const operators = useAppSelector((state) => state.operators.operators);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.queueCard}>
        <div className={styles.queueIcon}>
          <img src={icon} />
        </div>

        <div className={styles.queueText}>
          <div className={styles.queueTitle}>
            <span> Звонков в очереди: </span>
            <span className={styles.queueValue}> {queueCalls}</span>
          </div>
          <div className={styles.queueTitle}>
            <span> Количество активных звонков в системе: </span>
            <span className={styles.queueValue}> {activeCalls}</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {operators.map((operator) => (
          <OperatorsItem operator={operator} key={operator.id} now={now} />
        ))}
      </div>
    </div>
  );
};
