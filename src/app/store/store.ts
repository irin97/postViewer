import { configureStore } from "@reduxjs/toolkit";
import { loginApi } from "@/shared/api/loginApi";
import { campaignApi } from "@/shared/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notificationReducer } from "@/shared/model/notification/notificationSlice";
import { operatorsReducer } from "@/shared/model/operators/operatorsSlice";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        operators: operatorsReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [campaignApi.reducerPath]: campaignApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loginApi.middleware)
            .concat(campaignApi.middleware)

})
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch