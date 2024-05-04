import { Box, Typography } from "@mui/material"
import maticGame from "../../public/maticGame.png"
import starPoints from "../../public/starPoints.png"
import photoProfile from "../../public/photoProfile.svg"
import cards from "../../public/cards.svg"
import CardTutorial from "../components/CardTutorial"
import CardGame from "../components/CardGame"
import { useNavigate } from "react-router-dom"
import useQuery from "../hooks/useQuery"
import { useEffect } from "react"

function Home() {
  const navigate = useNavigate()
  const query = useQuery()
  const level = query.get("level")

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
      <Box
        height={"20%"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        gap={"70%"}
      >
        <Box>
          <img src={maticGame} height={"80px"} />
        </Box>
        <Box display={"flex"} gap={"10%"} alignItems={"center"}>
          <img src={starPoints} height={"5%"} />
          <p>{0} Pts</p>
          <img src={photoProfile} height={"80px"} />
        </Box>
      </Box>
      <Box
        padding={"30px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
      >
        <Typography variant="h3">
          Selecione seu <br /> nível de dificuldade
        </Typography>
        <Box
          display={"grid"}
          gridTemplateColumns={"1fr 1fr 1fr"}
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
      </Box>
    </Box>
  )
}

export default Home
