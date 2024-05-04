import { createTheme } from "@mui/material/styles"
import { TypographyStyleOptions } from "@mui/material/styles/createTypography"
import { Colors } from "../../components/utils/colors"

const titleStyle: TypographyStyleOptions = {
  fontFamily: '"Fredoka", sans-serif',
  color: Colors.green,
  fontWeight: 600,
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#f5f5f5",
      dark: "#2b3b2b",
      light: "##A4CAA4",
    },
    secondary: {
      main: "#365435",
      light: "#fbfefb",
      contrastText: "#bf5a10",
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: titleStyle,
    h2: titleStyle,
    h3: titleStyle,
    h4: titleStyle,
    h5: titleStyle,
    h6: titleStyle,
  },
})

export default defaultTheme
