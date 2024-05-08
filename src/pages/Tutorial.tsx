import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Colors } from "../components/utils/colors"
import videoTest from "../../public/tutorialVideoTeste.mp4"
import useQuery from "../hooks/useQuery"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

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
      minHeight={"100vh"}
      minWidth={"100vw"}
      bgcolor={Colors.green}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        padding={{ xs: "20px", md: "50px" }}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
      >
        <Box>
          <Typography
            variant="h6"
            color={Colors.white}
            fontSize={isXs ? 30 : 40}
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
    </Box>
  )
}
