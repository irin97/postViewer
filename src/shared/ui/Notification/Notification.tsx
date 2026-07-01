import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { closeNotification } from '@/shared/model/notification/notificationSlice';
import styles from './Notification.module.scss';

export const Notification = () => {
  const dispatch = useAppDispatch();
  const { isOpen, type, title, message } = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (!isOpen || type !== 'success') return;

    const timer = setTimeout(() => {
      dispatch(closeNotification());
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, dispatch, type]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <button className={styles.close} onClick={() => dispatch(closeNotification())}>
          ✕
        </button>
      </div>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};
