import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';


function isFetchError(error: unknown): error is FetchBaseQueryError {
    return (
        typeof error === 'object' && error !== null && 'data' in error && 'status' in error
    )
}

export function getApiErrorMessage(error: unknown): string {
    if (isFetchError(error) && typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
        return String(error.data.message)
    }
    if (error instanceof Error) {
        return error.message
    }
    return ''
}