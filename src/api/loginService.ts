import axios from 'axios';
import User from '../Models/User';

const LOGIN_ROUTE = '/login';

const loginService = {
    login: async (loginData: User) => {
        // const response = await axios.post<PostLoginResponse>(
        //     LOGIN_ROUTE,
        //     loginData
        // );
        // if (response.data.status === 'ok') {
        //     return response.data.token;
        // }
        const mock = await axios.get<User[]>('./users.json');
        const user = mock.data.find(
            ({ login, password }) =>
                login === loginData.login && password === loginData.password
        );
        const token = 'wc7wK5h83HEos';
        if (user) {
            return token;
        }
    }
};

export default loginService;

export interface PostLoginResponse {
    status: string;
    token: string;
}
