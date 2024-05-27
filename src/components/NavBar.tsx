import {
  Box,
  Button,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import maticGame from "../../public/maticGame.png"
import starPoints from "../../public/starPoints.png"
import happyChild from "../../public/happyChild.jpg"
import vectorMenu from "../../public/vectorMenu.svg"
import vectorArrow from "../../public/vectorArrow.svg"
import vectorStar from "../../public/vectorStar.svg"
import { Colors } from "./utils/colors"
import { useState } from "react"
import CardLevelHistory from "./CardLevelHistory"

interface Levels {
  easy: boolean
  medium: boolean
  hard: boolean
}

interface Props {
  level?: string | undefined
  levels: Levels
}

export default function NavBar({ levels, level }: Props) {
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"20px"}
    >
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
        <Button style={{ padding: 0 }} onClick={toggleDrawer(true)}>
          <img
            src={happyChild}
            style={{
              borderRadius: "75px",
            }}
            height={"80px"}
          />
        </Button>
        <Box />
      </Box>
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: isXs ? "100vw" : "400px" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <Stack alignItems={"self-start"} paddingTop={"30px"}>
            <Button style={{ transform: "rotate(180deg)" }}>
              <img src={vectorArrow} />
            </Button>
          </Stack>

          <Stack
            padding={"20px"}
            alignItems={"center"}
            style={{ gap: isXs ? "50px" : "30px" }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"10px"}
              paddingRight={"20px"}
            >
              <img src={vectorStar} height={40} />
              <Typography variant={"h4"} fontSize={"30px"}>
                Meu Perfil
              </Typography>
            </Box>
            <Stack>
              <img
                src={happyChild}
                style={{
                  borderRadius: isXs ? "100px" : "75px",
                  boxShadow: "1px 5px 4px 2px rgb(0 0 0 / 29%)",
                }}
                height={isXs ? "200px" : "150px"}
              />
            </Stack>
            <Stack gap={2} alignItems={"center"}>
              <Typography variant="h4" fontSize={"24px"}>
                Histórico de acertos
              </Typography>
              <CardLevelHistory
                date="02/03"
                level="Fácil"
                currentLevel={
                  level
                    ? level === "Fácil"
                      ? true
                      : false
                    : levels.easy
                      ? true
                      : false
                }
              />
              <CardLevelHistory
                date="05/04"
                level="Médio"
                currentLevel={
                  level
                    ? level === "Médio"
                      ? true
                      : false
                    : levels.medium
                      ? true
                      : false
                }
              />
              <CardLevelHistory
                date="08/02"
                level="Difícil"
                currentLevel={
                  level
                    ? level === "Difícil"
                      ? true
                      : false
                    : levels.hard
                      ? true
                      : false
                }
              />
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}
