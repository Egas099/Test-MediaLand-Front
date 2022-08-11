import { Avatar, Image, Row, Space } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import styles from './NavBar.module.css';
import image from '../../images/MdLd_small.bmp';
import { useTypedDispatch, useTypedSelector } from '../../hooks/useTypedRedux';
import { authActionCreator } from '../../store/reducers/auth/actionCreator';
const { logout } = authActionCreator;

const NavBar = () => {
    const dispatch = useTypedDispatch();
    const username = useTypedSelector(state => state.auth.username);

    return (
        <Header className={styles.header}>
            <Row justify="space-between" align="middle">
                <Image src={image} preview={false} />
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

export default NavBar;
