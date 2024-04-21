import { ThemeProvider } from "@mui/material"
import "./App.css"
import AppRoutes from "./routes/AppRoutes"
import defaultTheme from "./config/theme/defaultTheme"

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
