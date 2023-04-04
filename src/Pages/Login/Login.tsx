import { Card, Col, Image, Layout, Row, Space } from 'antd';
import LoginForm from 'Components/LoginForm/LoginForm';
import styles from './Login.module.css';
import { imageService } from 'shared/api/imageService';

const links = ['Главная', 'Конфиденциальность', 'Условия', 'О портале'];

function Login() {
    return (
        <Layout className={styles.fullHeight}>
            <Row justify="space-between" align="middle" wrap={false}>
                <Col className={styles.promo}>
                    <Image
                        className={styles.promoBack}
                        alt="MediaLand"
                        src={imageService.loginBack}
                        preview={false}
                        data-back
                    />
                    <Image
                        height={'150px'}
                        alt="MediaLand"
                        src={imageService.largeLogo}
                        preview={false}
                    />
                    <Row className={styles.links}>
                        {links.map(link => (
                            <span>{link}</span>
                        ))}
                    </Row>
                </Col>
                <Card className={styles.loginSide}>
                    <Space className={styles.card} direction="vertical" size="middle">
                        <div>
                            <h1>Войдите</h1>
                            <h4>
                                или <a href="/">зарегистрируйтесь</a>
                            </h4>
                        </div>
                        <LoginForm />
                        <span>Забыли пароль или не можете войти?</span>
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
}

export default Login;
