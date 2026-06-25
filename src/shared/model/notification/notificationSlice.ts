import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type NotificationType = 'error' | 'success';

interface NotificationState {
    isOpen: boolean;
    type: NotificationType;
    title: string;
    message: string;
}

const initialState: NotificationState = {
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<{
                type: NotificationType;
                title: string;
                message?: string;
            }>) => {
            state.isOpen = false;
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.message = action.payload.message ?? '';
            state.isOpen = true;
        },
        closeNotification: (state) => {
            state.isOpen = false
        },
    },
})

export const { showNotification, closeNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer