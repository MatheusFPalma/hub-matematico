import { Box, Typography } from "@mui/material"
import vectorStar from "../../public/vectorStar.svg"
import play from "../../public/play.svg"
import { Link } from "react-router-dom"
import { Colors } from "./utils/colors"
import Tutorial from "../pages/Tutorial"

interface Props {
  text: string
  title: string
  nameGame?: string
  disabled?: boolean
  tutorialId: number
}

function CardTutorial({
  text,
  title,
  nameGame,
  disabled = false,
  tutorialId,
}: Props) {
  return (
    <Box
      component={Link}
      to={!disabled ? `/tutorial?id=${tutorialId}` : "/home"}
      bgcolor={!disabled ? Colors.green : Colors.grey}
      display={"flex"}
      flexDirection={"column"}
      borderRadius={"15px"}
      padding={"20px 50px 20px 20px"}
      color={"white"}
      gap={"10px"}
      fontFamily={"Nunito, sans-serif"}
      fontSize={"16px"}
    >
      <Box display={"flex"} gap={"10px"}>
        <img src={vectorStar} />
        <Typography variant="h5" color={Colors.white}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography>{text}</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>{nameGame ? nameGame : ""}</Box>
        <Box>
          <img src={play} />
        </Box>
      </Box>
    </Box>
  )
}

export default CardTutorial
