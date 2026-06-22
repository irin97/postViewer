import type { CampaignInfo } from "@/shared/api";
import type { Dispatch, SetStateAction } from "react";

export interface EditCampaignPanelProps {
    data: CampaignInfo
    handleOpen: Dispatch<SetStateAction<number | null>>
}

export type formDataType = Pick<CampaignInfo, "step_percent" | "cps" | "auto_dial_type">;