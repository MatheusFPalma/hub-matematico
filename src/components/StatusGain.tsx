import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateLifes } from '../store/modules/lifes.slice'
import ButtonDefault from './ButtonDefault'
import happy from '/happy.png'
import sad from '/sad.png'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material'
import { actionTimer, setPointsRules, updateScore } from '../store/modules/challenge.slice'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import { clearSelectedCards } from '../store/modules/cards.slice'

interface StatusGainProps {
    right: boolean | null
    children?: React.ReactNode
    actionChallenge: (challenge: boolean) => void
    timer: (startTime: boolean) => void
}


const StatusGain: React.FC<StatusGainProps> = ({ right, actionChallenge, timer }) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()

    const lifesRedux = useAppSelector((item) => item.lifes)
    const pointsRedux = useAppSelector((item) => item.challenges.rules)
    const getLevelRedux = useAppSelector((item) => item.operations.gameLevel)
    const lastSelectedCardsRedux = useAppSelector(state => state.cards.lastSelectedCards)

    const [countHits, setCountHits] = useState<number>(0)
    const [wrongs, setWrongs] = useState<number>(0)
    const [pointsPerQuestionLevel, setPointsPerQuestionLevel] = useState<number>(0)
    const [pointCurrentLevel, setPointCurrentLevel] = useState<number>(0)
    const [lifes, setLifes] = useState<number>(0)
    const [scoreTotal, setScoreTotal] = useState<number[]>([])
    const [levelTutorial, setLevelTutorial] = useState<"Fácil" | "Médio" | "Difícil" | null>(null)

    const incrementHits = () => {
        dispatch(actionTimer(timer(true)))
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
        actionChallenge(true)
    }

    const checkPoints = () => {
        wrongResponse()
        actionChallenge(true)
        dispatch(actionTimer(timer(true)))
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
        setLevelTutorial(getLevelRedux)
    }, [levelTutorial])

    useEffect(() => {
        setLifes(lifesRedux.lifes)
        if (pointsRedux.pointsPerQuestion > 0) {
            setPointsPerQuestionLevel(pointsRedux.pointsPerQuestion)
        }

    }, [pointsPerQuestionLevel, pointCurrentLevel, lifes])

    return (
        <>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Link to={`/home?level=${levelTutorial}`}>
                    <ChevronLeftIcon sx={{ display: 'flex', color: '#fff', padding: '20px 0px 40px 0px', justifyContent: 'flex-start', width: '35px', height: '35px' }} />
                </Link>
                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', borderTopRightRadius: '30px', borderTopLeftRadius: '30px', backgroundColor: '#fff', width: '100%', height: '180px', alignItems: 'center' }}>
                    {right ?
                        <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: theme.palette.secondary.main }}>Você acertou</span>
                        : <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: '#B92B0C' }}>Tente novamente</span>}
                </Grid>
                <img style={{ display: 'flex', width: '100%', height: '60%', justifyContent: 'center', alignItems: 'flex-start' }} src={right ? happy : sad} alt='statusGain' />
                {right ? (
                    <div style={{ width: '100%' }}>
                        <ButtonDefault action={incrementHits} customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
                    </div>
                ) :
                    <div style={{ width: '100%' }}>
                        <ButtonDefault action={checkPoints} customStyle={'buttonMakeAgain'} label={'Refazer'} styleWidth={'100%'} styleHeight={60} />
                        <ButtonDefault action={checkPoints} customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
                    </div>
                }
            </div>
        </>
    )
}

export default StatusGain