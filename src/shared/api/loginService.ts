import User from 'models/user';
import { SERVER_URL, SUCCESS_STATUS } from 'shared/constants';

const LOGIN_ROUTE = '/login';
export interface LoginResponse {
    status: string;
    token: string;
}

const loginService = {
    login: async (loginData: User) => {
        const config = {
            body: JSON.stringify(loginData),
            method: 'POST'
        };

        const response = (await fetch(SERVER_URL + LOGIN_ROUTE, config).then(
            response => response.json()
        )) as LoginResponse;

        if (response.status === SUCCESS_STATUS) {
            return response.token;
        } else {
            throw new Error('Login failed');
        }
    }
};

export default loginService;
