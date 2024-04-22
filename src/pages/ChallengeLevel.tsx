import { Grid, Typography } from "@mui/material"
import levelEasy from "/levelEasy.png"
import levelMiddle from "/levelMiddle.png"
import levelHard from "/levelHard.png"
import logoMatic from "/logoMatic.png"
import "../App.css"
import { useState } from "react"
import { useAppDispatch } from "../store/hooks"
import { getOperationOne, getOperationTwo } from "../store/modules/operation.slice"
import { useNavigate } from "react-router-dom"

const ChallengeLevel = () => {

    const navigate = useNavigate()
    const [currentLevel, setCurrentLevel] = useState<string>('')
    const dispatch = useAppDispatch()

    function generateOperation(level: string) {
        switch (level) {
            case 'Fácil':
                setCurrentLevel('Facil')
                dispatch(getOperationOne('adicao'))
                dispatch(getOperationTwo('subtracao'))
                navigate('/')
                break;
            case 'Médio':
                setCurrentLevel('Médio')
                dispatch(getOperationOne('multiplicacao'))
                dispatch(getOperationTwo('divisao'))
                navigate('/')
                break;
            case 'Difícil':
                setCurrentLevel('Difícil')
                dispatch(getOperationOne('fracao'))
                navigate('/')
                break;
        }
    }

    return (
        <Grid container sx={{ flexDirection: 'column' }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: "center" }}>
                <img style={{ width: '140px', height: '150px', marginBottom: '10px' }} src={logoMatic} alt='calculadora' />
                <Typography >Selecione seu nível de dificuldade</Typography>
            </Grid>
            <Grid item sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: "20px" }}>
                <button onClick={() => generateOperation('Fácil')} className="buttonChallenger" value={currentLevel}>Fácil <img src={levelEasy} alt='levelEasy' /></button>
                <button onClick={() => generateOperation('Médio')} className="buttonChallenger" value={currentLevel}>Médio <img src={levelMiddle} alt='levelMiddle' /></button>
                <button onClick={() => generateOperation('Difícil')} className="buttonChallenger" value={currentLevel}>Difícil <img src={levelHard} alt='levelHard' /></button>
            </Grid>
        </Grid>
    )
}

export default ChallengeLevel