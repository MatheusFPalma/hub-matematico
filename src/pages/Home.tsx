import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"

import cards from "../../public/cards.svg"
import CardTutorial from "../components/CardTutorial"
import CardGame from "../components/CardGame"
import { useNavigate } from "react-router-dom"
import useQuery from "../hooks/useQuery"
import { useEffect } from "react"
import NavBar from "../components/NavBar"
import { useAppSelector } from "../store/hooks"

function Home() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const navigate = useNavigate()
  const level = useAppSelector(state => state.operations.gameLevel)

  useEffect(() => {
    if (!level) {
      navigate("/choiceLevel")
    }
  }, [level])

  if (!level) {
    return <></>
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
      <NavBar />
      <Box
        padding={"30px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
      >
        {!isXs && (
          <Typography variant="h3">
            Selecione seu <br /> nível de dificuldade
          </Typography>
        )}
        <Box
          display={"grid"}
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr 1fr" }}
          gap={"20px"}
          alignItems={"stretch"}
        >
          <CardTutorial
            title="Tutorial Nível 01"
            text="Pronto para o desafio?"
            nameGame="Card Memory"
            disabled={level != "Fácil"}
            tutorialId={1}
          />

          <CardTutorial
            title="Tutorial Nível 02"
            text="Indo mais além"
            disabled={level != "Médio"}
            tutorialId={2}
          />
          <CardTutorial
            title="Tutorial Nível 03"
            text="Card Memory"
            disabled={level != "Difícil"}
            tutorialId={3}
          />

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
  )
}

export default Home
