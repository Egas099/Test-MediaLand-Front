import { Avatar, Image, Row, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import styles from './AppHeader.module.css';
import {
    useTypedDispatch,
    useTypedSelector
} from '../../shared/hooks/useTypedRedux';
import { authActionCreator } from '../../store/reducers/auth/actionCreator';
import { imageService } from 'shared/api/imageService';
const { logout } = authActionCreator;

const AppHeader = () => {
    const dispatch = useTypedDispatch();
    const username = useTypedSelector(state => state.auth.username);

    return (
        <Header className={styles.header}>
            <Row justify="space-between" align="middle">
                <Image src={imageService.headerLogo} preview={false} />
                <Space>
                    <span onClick={() => dispatch(logout())}>
                        Hello {username}
                    </span>
                    <Avatar />
                </Space>
            </Row>
        </Header>
    );
};

export default AppHeader;
