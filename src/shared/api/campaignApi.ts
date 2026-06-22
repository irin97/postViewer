import { baseQueryWithReauth } from "./reauthQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { ActiveCampaignRes, CallInfoRes, EditCampaignInfoParam } from "./apiTypes";
import { serializeForm } from "../lib/serializeForm";

export const campaignApi = createApi({

    reducerPath: 'campaignApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Campaign'],
    endpoints: (build) => ({
        activeCampaigns: build.query<ActiveCampaignRes, void>({
            query: () => 'robot/campaign/list?page=1&limit=30&date_type=false&archive=0&removed=false&is_active=true',
            providesTags: ['Campaign']
        }),
        oldCallInfo: build.query<CallInfoRes, number>({
            query: (id) => `robot/statistics/contacts/step?campaign_ids[]=${id}`
        }),
        newCallInfo: build.query<CallInfoRes, number>({
            query: (id) => `robot/statistics/contacts/new?campaign_ids[]=${id}`
        }),
        editCampaignInfo: build.mutation<CallInfoRes, EditCampaignInfoParam>({
            query: ({ data, id }) => {
                const params = serializeForm(data);

                return {
                    url: `robot/campaign/update/${id}`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: params.toString()
                };
            },
            invalidatesTags: ["Campaign"]
        })
    })
})



export const { useActiveCampaignsQuery, useOldCallInfoQuery, useNewCallInfoQuery, useEditCampaignInfoMutation } = campaignApi