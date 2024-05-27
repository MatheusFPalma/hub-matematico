import { Box, Grid, Typography } from "@mui/material"
import levelEasy from "/levelEasy.png"
import levelMiddle from "/levelMiddle.png"
import levelHard from "/levelHard.png"
import maticGame from "/maticGame.png"
import "../App.css"
import { useState } from "react"
import { useAppDispatch } from "../store/hooks"
import { getOperation } from "../store/modules/operation.slice"
import { useNavigate } from "react-router-dom"
import { setPointsRules } from "../store/modules/challenge.slice"
import { Colors } from "../components/utils/colors"
import backgroundSplash from '/backgroundSplash.png';

const ChoiceLevel = () => {
  const navigate = useNavigate()
  const [currentLevel, setCurrentLevel] = useState<string>("")
  const dispatch = useAppDispatch()

  const objectLevelEasy = {
    scoreCurrentLevel: 0,
    pointsPerQuestion: 5,
    countHits: 0,
    scoreTotal: [],
  }

  const objectLevelMidle = {
    scoreCurrentLevel: 0,
    pointsPerQuestion: 10,
    countHits: 0,
    scoreTotal: [],
  }

  const objectLevelHard = {
    scoreCurrentLevel: 0,
    pointsPerQuestion: 15,
    countHits: 0,
    scoreTotal: [],
  }

  const setRules = (level: string) => {
    switch (level) {
      case "Fácil":
        dispatch(setPointsRules(objectLevelEasy))
        break
      case "Médio":
        dispatch(setPointsRules(objectLevelMidle))
        break
      case "Difícil":
        dispatch(setPointsRules(objectLevelHard))
        break
    }
  }

  function getLevel(level: string) {
    switch (level) {
      case "Fácil":
        setCurrentLevel("Facil")
        dispatch(getOperation({ operationLevel: "+", gameLevel: "Fácil" }))
        setRules(level)
        navigate("/play-room")
        break
      case "Médio":
        setCurrentLevel("Médio")
        dispatch(getOperation({ operationLevel: "x", gameLevel: "Médio" }))
        setRules(level)
        navigate("/play-room")
        break
      case "Difícil":
        setCurrentLevel("Difícil")
        dispatch(getOperation({ operationLevel: "÷", gameLevel: "Difícil" }))
        setRules(level)
        navigate("/play-room")
        break
    }
    setCurrentLevel(level)
    navigate(`/home?level=${level}`)
  }

  return (
    <Box sx={{ display: 'flex', width: "100vw", height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${backgroundSplash})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <Grid
        container
        sx={{
          alignItems: "center",
          justifyContent: 'center',
          textAlign: "center",
          flexDirection: "column",
          height: '80vh',
          width: '100vw',
          backgroundColor: '#fff'
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "100px", marginBottom: "10px" }}
            src={maticGame}
            alt="calculadora"
          />
          <Typography
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
              fontFamily: "Fredoka, sans-serif",
              fontSize: "25.41px",
              fontWeight: 600,
              color: Colors.green,
            }}
          >
            Selecione seu nível de dificuldade
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => getLevel("Fácil")}
            className="buttonChoiceLevel"
            value={currentLevel}
          >
            Fácil <img src={levelEasy} alt="levelEasy" />
          </button>
          <button
            onClick={() => getLevel("Médio")}
            className="buttonChoiceLevel"
            value={currentLevel}
          >
            Médio <img src={levelMiddle} alt="levelMiddle" />
          </button>
          <button
            onClick={() => getLevel("Difícil")}
            className="buttonChoiceLevel"
            value={currentLevel}
          >
            Difícil <img src={levelHard} alt="levelHard" />
          </button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChoiceLevel
