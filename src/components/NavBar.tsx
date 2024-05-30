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
import CardChooseLevel from "./CardChooseLevel"
import levelEasy from "../../public/levelEasy.png"
import levelMiddle from "../../public/levelMiddle.png"
import levelHard from "../../public/levelHard.png"
import { Levels } from "../pages/Home"
import CardTutorial from "./CardTutorial"

interface Props {
  level: string
  onChangeLevel: (newLevel: keyof Levels) => void
}

export default function NavBar({ level, onChangeLevel }: Props) {
  const [openSettings, setOpenSettings] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))

  const toggleDrawer = (newOpen: boolean, seccion?: string) => () => {
    if (seccion === "settings") {
      setOpenSettings(newOpen)
    } else if (seccion === "profile") {
      setOpenProfile(newOpen)
    }
    if (!seccion) {
      setOpenSettings(newOpen)
      setOpenProfile(newOpen)
    }
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
          onClick={toggleDrawer(true, "settings")}
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
        <Button style={{ padding: 0 }} onClick={toggleDrawer(true, "profile")}>
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
      <Drawer open={openSettings} anchor="left" onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: isXs ? "70vw" : "400px" }}
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
                Configurações
              </Typography>
            </Box>
            <Stack gap={2} alignItems={"flex-start"}>
              <Typography variant="h4" fontSize={"24px"}>
                Nível de dificuldade
              </Typography>
              <CardChooseLevel
                title="Fácil"
                checkedLevel={level === "Fácil"}
                image={levelEasy}
                onLevelChange={() => onChangeLevel("easy")}
              />
              <CardChooseLevel
                title="Médio"
                checkedLevel={level === "Médio"}
                image={levelMiddle}
                onLevelChange={() => onChangeLevel("medium")}
              />
              <CardChooseLevel
                title="Difícil"
                checkedLevel={level === "Difícil"}
                image={levelHard}
                onLevelChange={() => onChangeLevel("hard")}
              />
              <Typography variant="h4" fontSize={"24px"}>
                Tutorial
              </Typography>
              <CardTutorial
                title="Assistir tutorial"
                text="Nível 01"
                nameGame="Card Memory"
                disabled={level != "Fácil"}
                tutorialId={1}
                compact
              />
              <CardTutorial
                title="Assistir tutorial"
                text="Nível 02"
                disabled={level != "Médio"}
                tutorialId={2}
                compact
              />
              <CardTutorial
                title="Assistir tutorial"
                text="Nível 03"
                disabled={level != "Difícil"}
                tutorialId={3}
                compact
              />
            </Stack>
          </Stack>
        </Box>
      </Drawer>
      <Drawer open={openProfile} anchor="right" onClose={toggleDrawer(false)}>
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
                currentLevel={level === "Fácil"}
              />
              <CardLevelHistory
                date="05/04"
                level="Médio"
                currentLevel={level === "Médio"}
              />
              <CardLevelHistory
                date="08/02"
                level="Difícil"
                currentLevel={level === "Difícil"}
              />
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}
