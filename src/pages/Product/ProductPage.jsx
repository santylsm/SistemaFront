
import BACKENDURL from '../../utils/backendUrl.js'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Layout, theme, Button, Modal } from 'antd'
import { AdminLayout } from '../../components/layouts'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import CategoryForm from '../../components/Form/CategoryForm.jsx'

export const ProductPage = () => {
    // const url = 'http://localhost:8080/api/v1/product/get-product'
    const { Content } = Layout

    const {
        token: { colorBgContainer }
    } = theme.useToken()
    const [categories, setCategories] = useState([])
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState('')

    // get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${BACKENDURL}/api/productLG/get-productLG`)
            if (data.success) {
                setCategories(data.product)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wwent wrong in getting catgeory')
        }
    }

    useEffect(() => {
        getAllCategory()
    }, [])

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(
                `/api/productLG/update-productLG/${selected._id}`,
                { name: updatedName }
            )

            if (data.success) {
                toast.success(`${updatedName} is updated`)
                setSelected(null)
                setUpdatedName('')
                setVisible(false)
                getAllCategory()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somtihing went wrong')
        }
    }
    // delete category
    // const handleDelete = async (pId) => {
    //     try {
    //         const { data } = await axios.delete(
    //             `/api/v1/productLG/delete-productLG/${pId}`
    //         )
    //         if (data.success) {
    //             toast.success('category is deleted')

    //             getAllCategory()
    //         } else {
    //             toast.error(data.message)
    //         }
    //     } catch (error) {
    //         toast.error('Somtihing went wrong')
    //     }
    // }

    return (
        <AdminLayout>
            <Content style={{ margin: '0 8px' }}>
                <div

                    style={{
                        padding: 14,
                        minHeight: '86vh',
                        background: colorBgContainer
                    }}
                >

                    <div className="row">
                        <div className="text-center"><h1>PRODUCTO</h1></div>
                        <div className="col-10"></div>
                        <div className="col-2" >
                            <Link to={'/admin/registro/producto'}>
                                <Button className=" btn btn-success" type="primary" htmlType="submit" style={{
                                    padding: 10,
                                    width: 80,
                                    height: 35
                                }}>
                                    Agregar
                                </Button>
                            </Link>
                        </div>
                    </div><br></br>
                    <div className="container">
                        <div className="table-responsive">
                            <table border="1" className="table table-hover">
                                <thead className="thead-dark">
                                    <tr className="text-center">
                                        <th scope="col">ID</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Categoria</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((v) =>
                                        <>
                                            <tr className="text-center">
                                                <td>{v._id}</td>
                                                <td>{v.name}</td>
                                                <td>{v.category}</td>
                                                <td>{v.state}</td>
                                                <td>0</td>
                                                <td>
                                                </td >
                                            </tr >
                                        </>
                                    )}
                                </tbody >
                            </table >
                            <Modal
                                onCancel={() => setVisible(false)}
                                footer={null}
                                open={visible}
                            >
                                <CategoryForm
                                    value={updatedName}
                                    setValue={setUpdatedName}
                                    handleSubmit={handleUpdate}
                                />
                            </Modal>
                        </div >
                    </div >
                </div >
            </Content >
        </AdminLayout >
    )
}
