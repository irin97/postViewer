import { useEffect } from 'react';
import { initOperatorsSocket } from '@/shared/lib/initOperatorsSocket';
import { Notification } from '@/shared/ui/Notification/Notification';
import { BodyLayout } from '@/widgets/BodyLayout/BodyLayout';
import { useAppDispatch } from './store/hooks';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    initOperatorsSocket(dispatch);
  }, [dispatch]);

  return (
    <>
      <Notification />
      <BodyLayout />
    </>
  );
};

export default App;
