import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ChoiceLevel from "../pages/ChoiceLevel";
import PlayRoom from "../pages/PlayRoom";

const router = createBrowserRouter([
    {
        path: '/play-room',
        element: <PlayRoom />
    },
    {
        path: '/',
        element: <h1>Aqui pode ficar a página de onboard, pois ela é a primeira a ser mostrada ao usuario</h1>
    },
    {
        path: '/tutorial',
        element: ''
    },
    {
        path: '/choiceLevel',
        element: <ChoiceLevel />
    }

])

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default AppRoutes