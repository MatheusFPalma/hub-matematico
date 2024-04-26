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
        element: <h2>Aqui será a tela de tutorial com os cards dos tutoriais dos 3 níveis de dificuldade
            O card pode ser um componente que renderiza o tutorial do nível de acordo com o nível que foi escolhido pelo
            usuário na tela anterior
        </h2>
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