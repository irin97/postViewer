import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { LoginType } from "./apiTypes"

export const loginApi = createApi({

    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://crm48.sipspeak.ru/api/security/' }),
    endpoints: (build) => ({
        login: build.mutation<LoginType, void>({
            query: () => {
                const body = new URLSearchParams();
                body.append('_username', import.meta.env.VITE_SIP_USERNAME);
                body.append('_password', import.meta.env.VITE_SIP_PASSWORD);

                return {
                    url: 'login_check',
                    method: 'POST',
                    body
                }
            }
        })
    })
})

export const { useLoginMutation } = loginApi