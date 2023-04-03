import { Card, Image, Layout, Row } from 'antd';
import { FormEvent } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import styles from './Login.module.css';

type Props = {};

function Login({}: Props) {
    function submit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <Layout className={styles.fullHeight}>
            <Row justify="space-between" align="middle">
                <Row align="middle" justify="center" className={styles.logo}>
                    <Image
                        alt="MediaLand"
                        src="https://media-exp1.licdn.com/dms/image/C4D0BAQEwQT6McAH44A/company-logo_200_200/0/1641997103739?e=2147483647&v=beta&t=PWBJDO9m2rAKxarHl7qbbFZoiPGdXWBt_AVYTUOaYzM"
                        preview={false}
                    />
                </Row>
                <Card className={styles.loginSide}>
                    <div>
                        <h1>Войдите</h1>
                        <h4>
                            или <a href="/">зарегистрируйтесь</a>
                        </h4>
                    </div>
                    <LoginForm />
                    <h4>Забыли пароль или не можете войти?</h4>
                </Card>
            </Row>
        </Layout>
    );
}

export default Login;
