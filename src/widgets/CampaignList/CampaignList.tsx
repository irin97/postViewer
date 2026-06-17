import { useActiveCampaignsQuery } from "@/shared/api";
import { CampaignCard } from "../CampaignCard/CampaignCard";
import { EditCampaignPanel } from "@/features/editCampaignPanel/EditCampaignPanel";
import type { CampaignInfo } from "@/shared/api";
import { useState } from 'react'
import styles from "./CampaignList.module.scss"

export const CampaignList = () => {

    const { data: activeCampaigns, error, isLoading } = useActiveCampaignsQuery();
    const [openIdCard, setOpenIdCard] = useState<null | number>(null);

    if (isLoading) return <>Загрузка...</>
    if (error) {
        console.log(error)
        return <>Ошибка</>
    }

    const campaigns = activeCampaigns?.items || [];
    const openCardData = campaigns.find((el) => el.id === openIdCard);


    return (<>
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {campaigns.map((campaign: CampaignInfo) => (
                    <CampaignCard key={campaign.id} data={campaign} hadnleClick={setOpenIdCard} />
                ))}
            </div>
        </div>
        {openIdCard && openCardData &&
            (<EditCampaignPanel data={openCardData} handleOpen={setOpenIdCard} />)
        }
    </>
    )
}