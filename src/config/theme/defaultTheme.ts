import { createTheme } from "@mui/material/styles"
import { TypographyStyleOptions } from "@mui/material/styles/createTypography"
import { Colors } from "../../components/utils/colors"

const titleStyle: TypographyStyleOptions = {
  fontFamily: '"Fredoka", sans-serif',
  color: Colors.green,
  fontWeight: 600,
}
const littleTitleStyle: TypographyStyleOptions = {
  fontFamily: '"Fredoka", sans-serif',
  color: Colors.green,
  fontWeight: 500,
}
const subtitle1Style: TypographyStyleOptions = {
  fontFamily: '"Roboto Flex", sans-serif',
  color: Colors.white,
  fontSize: "18px",
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
    subtitle1: subtitle1Style,
    h1: titleStyle,
    h2: titleStyle,
    h3: titleStyle,
    h4: titleStyle,
    h5: littleTitleStyle,
    h6: littleTitleStyle,
  },
})

export default defaultTheme
