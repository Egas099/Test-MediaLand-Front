import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    username: string;
};

const initialState: AuthState = {
    isAuth: Boolean(localStorage.getItem('isAuth')) || false,
    isLoading: false,
    error: '',
    username: localStorage.getItem('username') || ''
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
