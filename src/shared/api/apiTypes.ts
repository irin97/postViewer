export interface LoginType {
    token: string
}

export interface LoginErr {
    message: string;
    code: number
}

export interface ActiveCampaignRes {
    items: CampaignInfo[]
}

export interface CampaignInfo {
    title: string,
    id: number,
    step_percent: number,
    cps: number,
    auto_dial_type: string
}

export type CallInfoRes = CallInfoType[]

export interface CallInfoType {
    count?: number
}

type EditCampaignForm = Partial<CampaignInfo>;

export interface EditCampaignInfoParam {
    data: EditCampaignForm;
    id: number;
}