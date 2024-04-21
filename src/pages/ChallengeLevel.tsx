import { Grid, Typography } from "@mui/material"
import levelEasy from "/levelEasy.png"
import levelMiddle from "/levelMiddle.png"
import levelHard from "/levelHard.png"
import logoMatic from "/logoMatic.png"
import "../App.css"

const ChallengeLevel = () => {

    return (
        <Grid container sx={{ flexDirection: 'column' }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: "center" }}>
                <img style={{ width: '140px', height: '150px', marginBottom: '10px' }} src={logoMatic} alt='calculadora' />
                <Typography >Selecione seu nível de dificuldade</Typography>
            </Grid>
            <Grid item sx={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: "20px" }}>
                <button className="buttonChallenger">Fácil <img src={levelEasy} alt='levelEasy' /></button>
                <button className="buttonChallenger">Médio <img src={levelMiddle} alt='levelMiddle' /></button>
                <button className="buttonChallenger">Difícil <img src={levelHard} alt='levelHard' /></button>
            </Grid>
        </Grid>
    )
}

export default ChallengeLevel