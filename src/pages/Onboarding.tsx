import LittleDots from "../components/LittleDots"
import logoMatic from "../../public/logoMatic.png"
import girl from "../../public/girl.png"
import girlGlasses from "../../public/girlGlasses.png"
import boy from "../../public/boy.png"
import { Box, Button, useMediaQuery, useTheme } from "@mui/material"
import CardWelcome from "../components/CardWelcome"
import { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const initialText = (
  <>
    Treine operações matemáticas de um <br />
    <b>modo divertido.</b>
  </>
)
const initialImage = girl

function Onboarding() {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const isSm = useMediaQuery(theme.breakpoints.only("sm"))
  const navigate = useNavigate()

  const [text, setText] = useState<ReactNode>(initialText)
  const [image, setImage] = useState(initialImage)
  const [step, setStep] = useState(1)

  const handleClickOnboarding = () => {
    setProperties()
  }

  const setProperties = () => {
    switch (step) {
      case 1:
        setText(
          <>
            Avance em cada <b>nível de desafio</b>
          </>,
        )
        setImage(girlGlasses)
        setStep(2)
        break
      case 2:
        setText(
          <>
            Combine{" "}
            <b>
              números e <br /> símbolos{" "}
            </b>
            para resolver problemas matemáticos e <b>ganhar pontos!</b>
          </>,
        )
        setImage(boy)
        setStep(3)
        break
      case 3:
        setText(initialText)
        setImage(initialImage)
        navigate("/choiceLevel")
        setStep(1)
        break
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setProperties()
    }, 10000)
  }, [step])

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      bgcolor={
        "var(--gradient-green, linear-gradient(180deg, #FBFFFB 0%, #F5F5F5 100%))"
      }
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        maxHeight={{ xs: "100%", md: "80%" }}
        maxWidth={{ xs: "90%", md: "80%" }}
      >
        <img src={logoMatic} alt="logo" />
        <Box
          boxShadow={"0px 0px 10px 0.5px #00000024"}
          borderRadius={"30px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          bgcolor={"white"}
          maxHeight={{ xs: "70%", md: "70%" }}
          maxWidth={{ xs: "100%", md: "80%" }}
          justifyContent={"space-evenly"}
        >
          <CardWelcome
            onClick={handleClickOnboarding}
            image={image}
            text={text}
          />
          <LittleDots accountDots={3} currentIndex={step} />
        </Box>
        <Box paddingTop={"20px"}>
          {(isXs || isSm) && (
            <Button
              onClick={handleClickOnboarding}
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#365435",
                color: "white",
                textTransform: "none",
                width: "150px",
              }}
            >
              Avançar
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Onboarding
