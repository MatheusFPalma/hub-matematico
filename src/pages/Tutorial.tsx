import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Colors } from "../components/utils/colors"
import videoTest from "../../public/tutorialVideoTeste.mp4"
import useQuery from "../hooks/useQuery"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const tutorialDetails: Record<string, { title: string; video: string }> = {
  "1": {
    title: "modo fácil",
    video: videoTest,
  },
  "2": {
    title: "modo médio",
    video: videoTest,
  },
  "3": {
    title: "modo difícil",
    video: videoTest,
  },
}

export default function Tutorial() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))

  let query = useQuery()
  const tutorialId = query.get("id")

  useEffect(() => {
    if (!tutorialId) {
      navigate("/home")
    }
  }, [tutorialId])

  if (!tutorialId) {
    return <></>
  }

  return (
    <Box
      minWidth={"100vw"}
      height={"100vh"}
      bgcolor={Colors.black}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      textAlign={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        padding='0px 40px'
      >
        <Link to={`/home?level=${query}`}>
          <ChevronLeftIcon sx={{
            display: 'flex', color: '#fff',
            justifyContent: "center", padding: '20px 40px 40px 0px', width: '35px', height: '35px'
          }} />
        </Link>
        <Typography
          variant="h6"
          color={Colors.white}
          fontSize={isXs ? 30 : 40}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          padding='0px 0px 40px 0px'
        >
          Aprenda como jogar o MaticGame: {tutorialDetails[tutorialId].title}
        </Typography>
      </Box>
      <Box>
        <video
          height={isXs ? "180px" : "500px"}
          controls
          style={{ borderRadius: "20px" }}
        >
          <source src={tutorialDetails[tutorialId].video} type="video/mp4" />
        </video>
      </Box>
    </Box>
  )
}
