import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"

import cards from "../../public/cards.svg"
import CardTutorial from "../components/CardTutorial"
import CardGame from "../components/CardGame"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { useAppSelector } from "../store/hooks"
import CardChooseLevel from "../components/CardChooseLevel"
import levelEasy from "../../public/levelEasy.png"
import levelMiddle from "../../public/levelMiddle.png"
import levelHard from "../../public/levelHard.png"
import useQuery from "../hooks/useQuery"

interface Levels {
  easy: boolean
  medium: boolean
  hard: boolean
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const getLevel = (level: string) => {
    switch (level) {
      case "easy":
        return "Fácil"
      case "medium":
        return "Médio"
      case "hard":
        return "Difícil"
      default:
        return level
    }
  }
  const [level] = useState(() => getLevel(searchParams.get("level") || "easy"))

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const [levels, setLevels] = useState<Levels>({
    easy: false,
    medium: false,
    hard: false,
  })

  const handleLevelChange = (level: keyof Levels) => {
    const newLevels: Levels = { easy: false, medium: false, hard: false }
    newLevels[level] = true
    setLevels(newLevels)
    setSearchParams({ level })
  }

  const getCheckedLevel = (value: string) => {
    if (levels.easy || levels.medium || levels.hard) {
      switch (value) {
        case "Fácil":
          return levels.easy
        case "Médio":
          return levels.medium
        case "Difícil":
          return levels.hard
      }
    } else {
      return level === value
    }
  }

  return (
    <Box
      minHeight={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      fontFamily={"Nunito, sans-serif"}
      fontSize={"30px"}
      bgcolor={
        "var(--gradient-green, linear-gradient(180deg, #FBFFFB 0%, #F5F5F5 100%))"
      }
    >
      <NavBar levels={levels} level={level ? level : undefined} />
      <Box
        padding={"0px 30px "}
        display={"flex"}
        flexDirection={"column"}
        gap={"10px"}
      >
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          {!isXs && (
            <Typography variant="h4">
              Selecione seu <br /> nível de dificuldade
            </Typography>
          )}
          <Box
            display={"grid"}
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
            gap={"20px"}
            alignItems={"stretch"}
          >
            <CardChooseLevel
              title="Fácil"
              checkedLevel={!!getCheckedLevel("Fácil")}
              image={levelEasy}
              onLevelChange={() => handleLevelChange("easy")}
            />
            <CardChooseLevel
              title="Médio"
              checkedLevel={!!getCheckedLevel("Médio")}
              image={levelMiddle}
              onLevelChange={() => handleLevelChange("medium")}
            />
            <CardChooseLevel
              title="Difícil"
              checkedLevel={!!getCheckedLevel("Difícil")}
              image={levelHard}
              onLevelChange={() => handleLevelChange("hard")}
            />
            <CardTutorial
              title="Tutorial Nível 01"
              text="Pronto para o desafio?"
              nameGame="Card Memory"
              disabled={!getCheckedLevel("Fácil")}
              tutorialId={1}
            />
            <CardTutorial
              title="Tutorial Nível 02"
              text="Indo mais além"
              disabled={!getCheckedLevel("Médio")}
              tutorialId={2}
            />
            <CardTutorial
              title="Tutorial Nível 03"
              text="Card Memory"
              disabled={!getCheckedLevel("Difícil")}
              tutorialId={3}
            />
          </Box>
        </Box>
        <Box>
          {!isXs && (
            <Typography paddingBottom={"5px"} variant="h4">
              Selecione seu desafio
            </Typography>
          )}
          <Box
            display={"grid"}
            gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
            gap={"20px"}
            alignItems={"stretch"}
          >
            {isXs ? (
              <Box
                display={"grid"}
                gridTemplateColumns={"1fr 1fr"}
                gap={"20px"}
                alignItems={"stretch"}
              >
                <CardGame title={<>Card Memory</>} image={cards} />
                <CardGame
                  title={
                    <>
                      Em breve novos <br />
                      jogos
                    </>
                  }
                  image={cards}
                  disabled
                />
                <CardGame
                  title={
                    <>
                      Em breve novos <br />
                      jogos
                    </>
                  }
                  image={cards}
                  disabled
                />
              </Box>
            ) : (
              <>
                <CardGame title={<>Card Memory</>} image={cards} />
                <CardGame
                  title={
                    <>
                      Em breve novos <br />
                      jogos
                    </>
                  }
                  image={cards}
                  disabled
                />
                <CardGame
                  title={
                    <>
                      Em breve novos <br />
                      jogos
                    </>
                  }
                  image={cards}
                  disabled
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home
