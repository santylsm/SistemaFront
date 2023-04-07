import { Layout } from 'antd'
import { Footer, Header, Sidebar } from '../ui'

export const ShopLayout = ({ children }) => {                                                   //eslint-disable-line
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout className="site-layout">
                    <Header />
                    {children}
                    <Footer />
                </Layout>
            </Layout>
        </>
    )
}
