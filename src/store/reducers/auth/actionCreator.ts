import User from 'models/user';
import loginService from 'shared/api/loginService';
import auth from '.';
import { AppDispatch } from '../..';
import { authCache, tryAsync } from 'shared/utils';

const { setError, setIsAuth, setIsLoading, setUsername } = auth.actions;
const cache = authCache();

export const authActionCreator = {
    ...auth.actions,
    login: (payload: User) => async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        await tryAsync<string>(
            () => loginService.login(payload),
            token => {
                if (token) {
                    dispatch(setIsAuth(true));
                    dispatch(setUsername('User'));
                    cache.set('User', token);
                } else {
                    dispatch(setError('Неверный логин или пароль'));
                }
            },
            error => {
                dispatch(setError('Неверный логин или пароль'));
                console.error(error);
            }
        );
        dispatch(setIsLoading(false));
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(setError(''));
        dispatch(setUsername(''));
        dispatch(setIsAuth(false));
        cache.clear();
    }
};
