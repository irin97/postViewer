import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { loginApi } from "./loginApi";
import type { LoginErr } from "./apiTypes";

// Базовый запрос 
const baseQuery = fetchBaseQuery({
    baseUrl: 'https://crm48.sipspeak.ru/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers;
    }
})

// Запрос с обработкой обновления токена
export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && 'data' in result.error && (result.error.data as LoginErr).message === 'JWT Token not found') {
        const loginResult = await api.dispatch(
            loginApi.endpoints.login.initiate()
        );

        if ('data' in loginResult && loginResult.data?.token) {
            localStorage.setItem('token', loginResult.data.token)

            result = await baseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('token')

            if ('error' in loginResult) {
                result = { error: loginResult.error as FetchBaseQueryError }
            }
        }
    }
    return result;
}

