import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import maticGame from "../../public/maticGame.png"
import starPoints from "../../public/starPoints.png"
import photoProfile from "../../public/photoProfile.svg"
import vectorMenu from "../../public/vectorMenu.svg"
import { Colors } from "./utils/colors"

export default function NavBar() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"20px"}
    >
      {isXs ? <img src={vectorMenu} /> : <img src={maticGame} />}

      <Box display={"flex"} alignItems={"center"} gap={"5px"}>
        <img src={starPoints} height={"5%"} />
        <Typography variant="h5" color={Colors.black}>
          {0} Pts
        </Typography>
        <img src={photoProfile} height={"80px"} />
        <Box />
      </Box>
    </Box>
  )
}
