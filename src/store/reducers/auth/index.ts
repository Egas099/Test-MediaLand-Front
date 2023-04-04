import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authCache } from 'shared/utils';

export type AuthState = {
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    username: string;
};
const cache = authCache().get();

const initialState: AuthState = {
    isAuth: cache.isAuth,
    username: cache.username || '',
    isLoading: false,
    error: ''
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, { payload }: PayloadAction<boolean>) => {
            state.isAuth = payload;
        },
        setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }: PayloadAction<string>) => {
            state.error = payload;
        },
        setUsername: (state, { payload }: PayloadAction<string>) => {
            state.username = payload;
        }
    }
});

export default auth;
