import { useNewCallInfoQuery, useOldCallInfoQuery, type CampaignInfo } from "@/shared/api"
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
    const { data: newCall, isLoading: newLoading, error: newError } = useNewCallInfoQuery(id, {
        pollingInterval: 600000, // 10 минут
        refetchOnFocus: true,
        skipPollingIfUnfocused: true,
    });
    const { data: oldCall, isLoading: oldLoading, error: oldError } = useOldCallInfoQuery(id, {
        pollingInterval: 600000, // 10 минут
        refetchOnFocus: true,
        skipPollingIfUnfocused: true,
    });

    return <div className={styles.card}>
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
                {renderValue(newLoading, newError, newCall?.[0]?.count)}
                <span>новых</span>
                <span className={styles.dot}>•</span>
                {renderValue(oldLoading, oldError, oldCall?.[0]?.count)}
                <span>перезвонов</span>
            </div>
        </div>
    </div >
}

const renderValue = (loading: boolean, error: unknown, value: number | undefined) => {
    if (loading) return <span className={styles.skeleton} ></span >
    if (error) return <span className={styles.value} >—</span >
    return <span className={styles.value}>{value ?? 0}</span>

}