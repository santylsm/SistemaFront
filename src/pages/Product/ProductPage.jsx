
import BACKENDURL from '../../utils/backendUrl.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Layout, theme, Button, Modal } from 'antd'
import ModalUpdateProduct from './ModalUpdateProduct.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AdminLayout } from '../../components/layouts/AdminLayout.jsx'
import { useSnackbar } from 'notistack'

export const ProductPage = () => {
    const { Content } = Layout
    const { token: { colorBgContainer } } = theme.useToken()
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [productToEdit, setProductToEdit] = useState({})
    const { enqueueSnackbar } = useSnackbar()

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG`)
            if (data.success) {
                setCategories(data.product)
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Something wwent wrong in getting catgeory')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${BACKENDURL}/api/productLG/productLG/${pId}`
            )
            if (data.success) {
                toast.success('category is deleted')
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somtihing went wrong')
        }
        toast.success('category is deleted')
        enqueueSnackbar('Producto Eliminado', {
            variant: 'error',
            autoHideDuration: 1500,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            }
        })
    }

    const handleGetProduct = async (pid) => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG/${pid}`)
            if (data.success) {
                setProductToEdit(data.product)
            }
        } catch (error) {
            toast.error('Something wwent wrong in getting catgeory')
        }
        setShowModal(true)
    }

    const updateProduct = async (product, name, description, price, imageUrl) => {
        try {
            const productUpdated = {
                name: name,
                description: description,
                price: price,
                state: product.state,
                category: product.category,

                //imageUrl: product.imageUrl,
                imageUrl: imageUrl,

            }
            const { data } = await axios.put(`${BACKENDURL}/api/productLG/update-productLG/${product._id}`,
                productUpdated
            )
            if (data.success) {
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somtihing went wrong')
        }
    }
    return (
        <AdminLayout >
            <Content style={{ margin: '0 8px' }}>
                <div

                    style={{
                        padding: 14,
                        minHeight: '86vh',
                        background: colorBgContainer
                    }}
                >

                    <div className="row">
                        <div className="text-center"><h1>MIS PRODUCTOS</h1></div>
                        <div className="col-10"></div>
                        <div className="col-2" >
                            <a href="/admin/registro/producto" >

                                <Button className=" btn btn-success" type="primary" htmlType="submit" style={{
                                    padding: 5,
                                    width: 85,
                                    height: 35
                                }}>
                                    Registrar

                                </Button>
                            </a>
                        </div>
                    </div><br></br>
                    <div className="container">
                        <div className="table-responsive">
                            <table border="1" className="table table-hover">
                                <thead className="thead-dark">
                                    <tr className="text-center">
                                        <th scope="col">ID</th>
                                        <th scope="col">Producto</th>

                                        <th scope="col">Categoría</th>
                                        <th scope="col">Precio</th>

                                        <th scope="col">Estado</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((v) =>
                                        <>
                                            <tr className="text-center">
                                                <td>{v._id}</td>
                                                <td>{v.name}</td>
                                                <td>{v.category}</td>
                                                <td>{v.price}</td>
                                                <td>{v.state}</td>
                                                <td>0</td>
                                                <td><img src={v.imageUrl} width="100" height="100" /></td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => {
                                                            handleGetProduct(v._id)
                                                        }} style={{
                                                            padding: 2,
                                                            width: 80,
                                                            margin: 2

                                                        }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            handleDelete(v._id)
                                                        }} style={{
                                                            padding: 1,
                                                            width: 80,
                                                            margin: 2
                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>

                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                            >

                            </Modal>
                        </div>
                    </div>
                </div>
                <ModalUpdateProduct
                    show={showModal}
                    productToEdit={productToEdit}
                    setShowModal={setShowModal}
                    setProductToEdit={setProductToEdit}
                    updateProduct={updateProduct}
                />
            </Content>
        </AdminLayout>
    )
}
