import type { CampaignInfo } from "@/shared/api"
import { useNewCallInfoQuery, useOldCallInfoQuery } from "@/shared/api"
import styles from "./CampaignCard.module.scss";
import cardIcon from "@/assets/iconCard.png";
import editIcon from "@/assets/editIcon.png";
import typeIcon from "@/assets/settingsIcon.png"
import type { Dispatch, SetStateAction } from "react";

interface CampaignCardProps {
    data: CampaignInfo
    hadnleClick: Dispatch<SetStateAction<number | null>>
}

export const CampaignCard = ({ data, hadnleClick }: CampaignCardProps) => {

    const { id, title, step_percent, cps, auto_dial_type } = data
    const { data: newCall, isLoading: newLoading, error: newError } = useNewCallInfoQuery(id);
    const { data: oldCall, isLoading: oldLoading, error: oldError } = useOldCallInfoQuery(id);

    const isLoading = newLoading || oldLoading;
    const error = newError || oldError;

    if (isLoading) return <>Загрузка...</>
    if (error) {
        console.log(error)
        return <>Ошибка</>
    }

    return <>
        <div className={styles.card}>
            <div className={styles.icon}>
                <img src={cardIcon} />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.name}> {title} </div>
                    <button className={styles.editButton} onClick={() => hadnleClick(id)}>
                        <img src={editIcon} />
                    </button>
                </div>

                <div className={styles.metrics}>
                    <span>{step_percent}%</span>
                    <span className={styles.dot}>•</span>
                    <span>CPS {cps}</span>
                </div>

                <div className={styles.type}>
                    <img className={styles.editButtonIcon} src={typeIcon} />
                    <span className={styles.typeValue}>{auto_dial_type} </span>
                </div>

                <div className={styles.stats}>
                    <span className={styles.value}> {newCall?.[0]?.count ?? 0} </span><span>новых</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.value}> {oldCall?.[0]?.count ?? 0} </span><span>перезвонов</span>
                </div>
            </div>
        </div>
    </>
}