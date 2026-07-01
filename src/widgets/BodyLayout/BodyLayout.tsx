import { CampaignList } from '../CampaignList/CampaignList';
import { OperatorsList } from '../OperatorsList/OperatorsList';
import styles from './BodyLayout.module.scss';

export const BodyLayout = () => {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <CampaignList />
          <OperatorsList />
        </div>
      </section>
    </main>
  );
};
