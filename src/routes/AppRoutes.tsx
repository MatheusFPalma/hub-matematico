import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/onboard',
        element: ''
    }
])

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRoutes