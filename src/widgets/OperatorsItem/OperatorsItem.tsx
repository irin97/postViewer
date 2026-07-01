import { formatTime } from '@/shared/lib/formatTime';
import { getOperatorStatus } from '@/shared/lib/getOperatorStatus';
import type { OperatorInfo } from '@/shared/model/operators/operatorsSlice';
import styles from './OperatorsItem.module.scss';

interface OperatorsItemProps {
  operator: OperatorInfo;
  now: number;
}

export const OperatorsItem = ({ operator, now }: OperatorsItemProps) => {
  const duration = formatTime(operator.startStatusTimestamp, now);
  const formattedStatus = getOperatorStatus(operator.status);

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <span className={`${styles.dot} ${styles[formattedStatus.className]}`} />

        <div className={styles.info}>
          <div className={styles.name}>{operator.fullName}</div>
          <div className={`${styles.status} ${styles[formattedStatus.className]}`}>
            {formattedStatus.name}
          </div>
        </div>
      </div>

      <div className={styles.time}>{duration}</div>
    </div>
  );
};
