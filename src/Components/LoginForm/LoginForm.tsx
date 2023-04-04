import { Button, Form, Input } from 'antd';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedRedux';
import User from '../../Models/User';
import { authActionCreator } from '../../store/reducers/auth/actionCreator';
const { login } = authActionCreator;

const LoginForm = () => {
    const dispatch = useTypedDispatch();
    const { isLoading, error } = useTypedSelector(state => state.auth);

    function submit(values: User) {
        dispatch(login(values));
    }

    return (
        <Form onFinish={submit}>
            {!isLoading && error && <div style={{ color: 'red' }}>{error}</div>}
            <Form.Item
                name="login"
                rules={[
                    { required: true, message: 'Введите электронную почту!' }
                ]}
            >
                <Input placeholder="Электронная почта" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: 'Введите электронную пароль!' }
                ]}
            >
                <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={isLoading}
                >
                    Войти в аккаунт
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
