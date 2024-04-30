import { Box } from "@mui/material"
import "../App.css"
import logoMatic from "/logoMatic.png"
import CardWelcome from "../components/CardWelcome"
import girlGlasses from "/girlGlasses.jpg"
import girl from "/girl.png"
import boy from "/boy.png"

function Home() {
  const originalText = "Treine operações matemáticas de um modo divertido"

  const handleClick = () => {
    console.log("Botão clicado!");
  };

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
      <img src={logoMatic} alt="oi" height={"20%"}></img>
      <CardWelcome text={originalText} image={girl} onClick={handleClick}/>
    </Box>
  )
}

export default Home
