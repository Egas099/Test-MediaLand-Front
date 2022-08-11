import axios from 'axios';
import auth from '.';
import { AppDispatch } from '../..';
import loginService from '../../../api/loginService';
import User from '../../../Models/User';
const { setError, setIsAuth, setIsLoading, setUsername } = auth.actions;

export const authActionCreator = {
    ...auth.actions,
    login: (payload: User) => async (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));
        try {
            const token = await loginService.login(payload);
            if (token) {
                dispatch(setIsAuth(true));
                dispatch(setUsername('User'));
                localStorage.setItem('token', token);
                localStorage.setItem('username', 'User');
                localStorage.setItem('isAuth', 'true');
            } else {
                dispatch(setError('Неправильный логин или пароль'));
            }
        } catch (error) {
            console.log(error);
        }
        dispatch(setIsLoading(false));
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(setError(''));
        dispatch(setUsername(''));
        dispatch(setIsAuth(false));
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAuth');
    }
};
