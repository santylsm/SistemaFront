import { Layout } from 'antd'
import { HomeFilled, EditFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export const Header = () => {
    const { Header } = Layout

    return (
        <Header
            style={{
                padding: 0,
                textAlign: 'center',
                color: 'white'
            }}>
            <Link to={'/'}>
                <HomeFilled />
            </Link>
            <Link to={'/admin'} style={{ padding: 5 }}>
                <EditFilled />
            </Link>
        </Header>
    )
}
