import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ChallengeLevel from "../pages/ChallengeLevel";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/onboard',
        element: ''
    },
    {
        path: '/challengeLevel',
        element: <ChallengeLevel />
    }

])

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRoutes