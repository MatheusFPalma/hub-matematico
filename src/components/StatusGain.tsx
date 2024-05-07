import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateLifes } from '../store/modules/lifes.slice'
import ButtonDefault from './ButtonDefault'
import happy from '/happy.png'
import sad from '/sad.png'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material'
import { setPointsRules, updateScore } from '../store/modules/challenge.slice'

interface StatusGainProps {
    right: boolean | null
    children?: React.ReactNode
}


const StatusGain: React.FC<StatusGainProps> = ({ right, children }) => {
    const theme = useTheme()

    const lifesRedux = useAppSelector((item) => item.lifes)
    const pointsRedux = useAppSelector((item) => item.challenges.rules)
    const dispatch = useAppDispatch()

    const [countHits, setCountHits] = useState<number>(0)
    const [wrongs, setWrongs] = useState<number>(0)
    const [pointsPerQuestionLevel, setPointsPerQuestionLevel] = useState<number>(0)
    const [pointCurrentLevel, setPointCurrentLevel] = useState<number>(0)
    const [lifes, setLifes] = useState<number>(0)
    const [scoreTotal, setScoreTotal] = useState<number[]>([])

    const incrementHits = () => {
        if (right) {
            dispatch(updateScore({
                scoreCurrentLevel: pointCurrentLevel,
                pointsPerQuestion: pointsPerQuestionLevel,
                scoreTotal: []
            }))
            setCountHits(countHits + 1)
            if (pointsPerQuestionLevel) {
                dispatch(setPointsRules({ countHits, pointsPerQuestion: pointsPerQuestionLevel, scoreCurrentLevel: countHits * pointsPerQuestionLevel, scoreTotal }))
            }
        }
        setCountHits(countHits)
    }

    const checkPoints = () => {
        wrongResponse()
        if (right) {
            setScoreTotal((prevstate: any) => [...prevstate, pointCurrentLevel])

            dispatch(updateScore({
                scoreCurrentLevel: pointCurrentLevel,
                pointsPerQuestion: pointsPerQuestionLevel,
                scoreTotal: []
            }))
        }
        else {
            if (wrongs === 5) {
                setLifes(0)
            }
            else {
                setWrongs(wrongs + 1)
                setLifes(lifes - 1)
            }
        }
        dispatch(updateScore({
            scoreCurrentLevel: pointCurrentLevel,
            pointsPerQuestion: pointsPerQuestionLevel,
            scoreTotal: []
        }))
    }

    const wrongResponse = () => {
        dispatch(updateLifes({
            lifes,
            wrongs
        }))
    }

    useEffect(() => {
        setLifes(lifesRedux.lifes)
        if (pointsRedux.pointsPerQuestion > 0) {
            setPointsPerQuestionLevel(pointsRedux.pointsPerQuestion)
        }

    }, [pointsPerQuestionLevel, pointCurrentLevel, lifes])

    return (
        <>
            <Grid container sx={{ paddingTop: '80px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <div style={{ zIndex: '-3', display: 'flex', width: '100%', height: '210px', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderTopRightRadius: '30px', borderTopLeftRadius: '30px' }}>
                    {right ? <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: theme.palette.secondary.main }}>Você acertou</span> : <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: '#B92B0C' }}>Tente novamente</span>}
                </div>
                <img style={{ display: 'flex', width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }} src={right ? happy : sad} alt='statusGain' />
            </Grid>
            {right ? (
                <ButtonDefault action={incrementHits} customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
            ) :
                <>
                    <ButtonDefault action={checkPoints} customStyle={'buttonMakeAgain'} label={'Refazer'} styleWidth={'100%'} styleHeight={60} />
                    <ButtonDefault action={checkPoints} customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
                </>
            }
        </>
    )
}

export default StatusGain