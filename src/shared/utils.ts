export function tryAsync<T>(
    tryFunction: Function,
    onSuccess: (result: T) => void,
    onFail: (error: unknown) => void
) {
    new Promise<T>(async (res, rej) => {
        res(await tryFunction());
    })
        .then(result => {
            if (result) {
                onSuccess(result);
            }
            onFail(`response is ${result}`);
        })
        .catch(error => onFail(error));
}
