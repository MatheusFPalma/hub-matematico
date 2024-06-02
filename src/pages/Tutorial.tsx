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
  const isSm = useMediaQuery(theme.breakpoints.only("sm"))

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
        width={'100%'}
      >
        <Link to={`/home?level=${query}`}>
          <ChevronLeftIcon sx={{ display: 'flex', color: '#fff', padding: '20px 0px 40px 40px', justifyContent: 'flex-start', width: '35px', height: '35px' }} />
        </Link>
      </Box>
      <Box sx={{ display: 'flex', alignItems: "center", flexDirection: 'column', textAlign: 'center' }}>
        <Typography
          variant="h6"
          color={Colors.white}
          fontSize={isXs ? 20 : isSm ? 25 : 40}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          padding='0px 40px'
          flexWrap={'wrap'}
        >
          Aprenda como jogar o MaticGame: {tutorialDetails[tutorialId].title}
        </Typography>
        <video
          height={isXs ? "180px" : isSm ? "320px" : "500px"}
          controls
          style={{ borderRadius: "20px" }}
        >
          <source src={tutorialDetails[tutorialId].video} type="video/mp4" />
        </video>
      </Box>
    </Box>
  )
}

