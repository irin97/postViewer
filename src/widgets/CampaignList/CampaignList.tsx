import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { EditCampaignPanel } from '@/features/editCampaignPanel/EditCampaignPanel';
import { type CampaignInfo, useActiveCampaignsQuery } from '@/shared/api';
import { getApiErrorMessage } from '@/shared/lib/getApiErrorMessage';
import { showNotification } from '@/shared/model/notification/notificationSlice';
import { Loader } from '@/shared/ui/Loader/Loader';
import { CampaignCard } from '../CampaignCard/CampaignCard';
import styles from './CampaignList.module.scss';

export const CampaignList = () => {
  const { data: activeCampaigns, error, isLoading } = useActiveCampaignsQuery();
  const [openIdCard, setOpenIdCard] = useState<null | number>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openIdCard === null) return;

    const handleEcsKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdCard(null);
    };

    document.addEventListener('keydown', handleEcsKey);

    return () => document.removeEventListener('keydown', handleEcsKey);
  }, [openIdCard]);

  useEffect(() => {
    if (!error) return;

    dispatch(
      showNotification({
        type: 'error',
        title: 'Произошла ошибка',
        message: getApiErrorMessage(error),
      }),
    );
  }, [error, dispatch]);

  const campaigns = activeCampaigns?.items ?? [];
  const openCardData = campaigns.find((el) => el.id === openIdCard);

  return (
    <>
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {error && <div className={styles.error}>Не удалось загрузить данные</div>}

        <div className={styles.list}>
          {campaigns.map((campaign: CampaignInfo) => (
            <CampaignCard key={campaign.id} data={campaign} hadnleClick={setOpenIdCard} />
          ))}
        </div>
      </div>
      {openIdCard && openCardData && (
        <EditCampaignPanel data={openCardData} handleOpen={setOpenIdCard} />
      )}
    </>
  );
};
