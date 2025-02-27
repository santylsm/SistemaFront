import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AdminPage, CategoryCreatePage, CategoryPage, HomePage, ProductCreatePage, ProductPage, ProveedorCreatePage, ProveedoresPage } from '../pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin',
        element: <AdminPage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/categorias',
        element: <CategoryPage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/productos',
        element: <ProductPage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/proveedors',
        element: <ProveedoresPage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/registro/producto',
        element: <ProductCreatePage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/registro/categoria',
        element: <CategoryCreatePage />,
        errorElement: <h1>error</h1>
    },
    {
        path: '/admin/registro/proveedor',
        element: <ProveedorCreatePage />,
        errorElement: <h1>error</h1>
    }
])

export const AppRouter = () => {
    return <RouterProvider router={router} />
}
