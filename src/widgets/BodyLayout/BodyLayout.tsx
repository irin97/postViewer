import styles from './BodyLayout.module.scss';
import { CampaignList } from '../CampaignList/CampaignList';
import { OperatorsList } from '../OperatorsList/OperatorsList';

export const BodyLayout = () => {

    return <main>
        <section>
            <div className={styles.container}>
                <CampaignList />
                <OperatorsList />
            </div>
        </section>
    </main>
}

