import { Grid, useTheme } from "@mui/material"
import starPoints from '/starPoints.png'

interface DisplayScoreProps {
    score: number
}


const DisplayScore: React.FC<DisplayScoreProps> = ({ score }) => {

    const theme = useTheme()
    return (
        <Grid container sx={{ justifyContent: 'flex-end', alignItems: 'center', padding: '20px 40px 0px 0px', gap: '10px' }}>
            <img style={{}} src={starPoints} width='30px' height='30px' alt='starPoints' />
            <div style={{ display: 'flex', fontFamily: 'Fredoka, sans-serif', fontSize: '20px', fontWeight: 600, color: theme.palette.primary.main }}>{score} Pts</div>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'none', backgroundColor: theme.palette.secondary.contrastText }}></div>
        </Grid>
    )
}

export default DisplayScore