import { ThemeProvider } from "@mui/material"
import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import defaultTheme from "./config/theme/defaultTheme"
import { Provider } from "react-redux"
import { store } from "./store"

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  )
}

export default App
