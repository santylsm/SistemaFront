import { Layout, theme, Progress } from 'antd'
import { AdminLayout } from '../components/layouts/AdminLayout'

export const AdminPage = () => {
    const { Content } = Layout
    const { token: { colorBgContainer } } = theme.useToken()

    return (
        <>
            <AdminLayout >
                <Content style={{ margin: '0 8px' }}>
                    <h1>ADMIN PAGE</h1>
                    <div
                        style={{
                            padding: 14,
                            minHeight: '86vh',
                            background: colorBgContainer
                        }}
                    >
                        <div
                            style={{
                                padding: 2,
                                minHeight: '5vh',
                                margin: 20
                            }}>Stock Productos Minimos</div>
                        <div>
                            <div className="container">
                                <label htmlFor="">Producto 1</label>
                                <Progress percent={30} />
                            </div>
                            <div className="container">
                                <label htmlFor="">Producto 2</label>
                                <Progress percent={50} status="active" />
                            </div>
                            <div className="container">
                                <label htmlFor="">Producto 3</label>
                                <Progress percent={30} />
                            </div>
                            <div className="container">
                                <label htmlFor="">Producto 4</label>
                                <Progress percent={70} status="exception" />
                            </div>
                            <div className="container">
                                <label htmlFor="">Producto 5</label>
                                <Progress percent={100} />
                            </div>
                            <div className="container">
                                <label htmlFor="">Producto 6</label>
                                <Progress percent={50} showInfo={false} />
                            </div>
                        </div>
                    </div>
                </Content>
            </AdminLayout >
        </>
    )
}
