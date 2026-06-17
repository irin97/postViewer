import type { CampaignInfo } from "@/shared/api";
import type { Dispatch, SetStateAction } from "react";

export interface EditCampaignPanelProps {
    data: CampaignInfo
    handleOpen: Dispatch<SetStateAction<number | null>>
}

export interface formDataType {
    step_percent: number,
    cps: number,
    auto_dial_type: string
}