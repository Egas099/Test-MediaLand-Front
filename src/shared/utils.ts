export async function tryAsync<T>(
    tryFunction: Function,
    onSuccess: (result: T) => void,
    onFail: (error: unknown) => void
) {
    try {
        const result = await tryFunction();
        if (result) {
            onSuccess(result);
        } else {
            console.error(result);
            onFail(`response is ${result}`);
        }
    } catch (error) {
        onFail(error);
    }
}

export const authCache = () => {
    return {
        get: () => ({
            isAuth: Boolean(localStorage.getItem('isAuth')),
            username: localStorage.getItem('username'),
            token: localStorage.getItem('token') || '',
        }),
        set: (userName: string, token: string) => {
            localStorage.setItem('token', token);
            localStorage.setItem('username', userName);
            localStorage.setItem('isAuth', 'true');
        },
        clear: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('isAuth');
        },

    };
};
