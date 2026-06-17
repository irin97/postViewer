import styles from './BodyLayout.module.scss'
import { CampaignList } from '../CampaignList/CampaignList'

export const BodyLayout = () => {

    return <main>
        <section>
            <div className={styles.container}>
                <CampaignList/> 
            </div>
        </section>
    </main>
}

