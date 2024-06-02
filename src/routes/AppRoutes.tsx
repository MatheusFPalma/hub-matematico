import { RouterProvider, createBrowserRouter } from "react-router-dom"
import ChoiceLevel from "../pages/ChoiceLevel"
import PlayRoom from "../pages/PlayRoom"
import Onboarding from "../pages/Onboarding"
import Home from "../pages/Home"
import Tutorial from "../pages/Tutorial"
import ScreenSplash from "../pages/ScreenSplash"

const router = createBrowserRouter([
  {
    path: "/play-room",
    element: <PlayRoom />,
  },
  {
    path: "/",
    element: <ScreenSplash />
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/tutorial",
    element: <Tutorial />,
  },
  {
    path: "/choiceLevel",
    element: <ChoiceLevel />,
  },
  {
    path: "/home",
    element: <Home />,
  },
])

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
