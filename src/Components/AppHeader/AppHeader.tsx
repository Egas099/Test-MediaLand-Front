import { Avatar, Image, Row, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { imageService } from 'shared/api/imageService';
import {
    useTypedDispatch,
    useTypedSelector
} from 'shared/hooks/useTypedRedux';
import { authActionCreator } from 'store/reducers/auth/actionCreator';
import styles from './AppHeader.module.css';
const { logout } = authActionCreator;

export const AppHeader = () => {
    const dispatch = useTypedDispatch();
    const username = useTypedSelector(state => state.auth.username);

    return (
        <Header className={styles.header}>
            <Row justify="space-between" align="middle">
                <Image src={imageService.headerLogo} preview={false} />
                <Space>
                    <span
                        className={styles.userName}
                        onClick={() => dispatch(logout())}
                        title="Выйти"
                    >
                        Hello {username}
                    </span>
                    <Avatar />
                </Space>
            </Row>
        </Header>
    );
};
