import { Box, Typography } from "@mui/material"
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
    <Box height={"100vh"} width={"100vw"} bgcolor={Colors.green}>
      <Box
        padding={"50px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"20px"}
        alignItems={"center"}
      >
        <Box>
          <Typography variant="h2" color={Colors.white} fontSize={40}>
            Aprenda como jogar o MaticGame: {tutorialDetails[tutorialId].title}
          </Typography>
        </Box>
        <Box>
          <video height={"500px"} controls style={{ borderRadius: "20px" }}>
            <source src={tutorialDetails[tutorialId].video} type="video/mp4" />
          </video>
        </Box>
      </Box>
    </Box>
  )
}
