import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import maticGame from "../../public/maticGame.png"
import starPoints from "../../public/starPoints.png"
import photoProfile from "../../public/photoProfile.svg"
import vectorMenu from "../../public/vectorMenu.svg"
import vectorArrow from "../../public/vectorArrow.svg"
import vectorStar from "../../public/vectorStar.svg"
import { Colors } from "./utils/colors"
import { useState } from "react"
import CardLevelHistory from "./CardLevelHistory"

interface Props {
  level: string
}

export default function NavBar({ level }: Props) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
    console.log("oi")
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"20px"}
    >
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "100vw" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Stack alignItems={"self-start"} paddingTop={"50px"}>
            <Button>
              <img src={vectorArrow} />
            </Button>
          </Stack>
          <Stack padding={"20px"} alignItems={"center"} gap={"20px"}>
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <img src={vectorStar} height={40} />
              <Typography variant="h4">Meu Perfil</Typography>
            </Box>
            <Stack>
              <Typography variant="h4">Histórico de acertos</Typography>
            </Stack>
            <Stack gap={2}>
              <CardLevelHistory
                date="02/03"
                level="Fácil"
                currentLevel={level === "Fácil" ? true : false}
              />
              <CardLevelHistory
                date="05/04"
                level="Médio"
                currentLevel={level === "Médio" ? true : false}
              />
              <CardLevelHistory
                date="08/02"
                level="Difícil"
                currentLevel={level === "Difícil" ? true : false}
              />
            </Stack>
          </Stack>
        </Box>
      </Drawer>
      {isXs ? (
        <Button
          style={{ padding: 0, justifyContent: "unset" }}
          onClick={toggleDrawer(true)}
        >
          <img src={vectorMenu} />
        </Button>
      ) : (
        <img src={maticGame} />
      )}

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
