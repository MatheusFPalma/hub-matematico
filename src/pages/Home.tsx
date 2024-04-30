import { Box } from "@mui/material"
import "../App.css"
import maticGame from "/maticGame.png"
import CardWelcome from "../components/CardWelcome"
import girlGlasses from "/girlGlasses.jpg"
import girl from "/girl.png"
import boy from "/boy.png"

function Home() {
  const originalText = "Treine operações matemáticas de um modo divertido"

  return (
    <Box
      height={"100vh"}
      width={"100vw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      bgcolor={"#fbfffb"}
    >
      <img src={maticGame} alt="oi" height={"20%"}></img>
      <CardWelcome text={originalText} image={girl} />
    </Box>
  )
}

export default Home
