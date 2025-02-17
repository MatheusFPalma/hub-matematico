import "../App.css"
import ButtonDefault from "../components/ButtonDefault";
import ChallengeLevel from "../components/ChallengeLevel"
import DisplayScore from "../components/DisplayScore";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { CardType, clearSelectedCards, getCards } from "../store/modules/cards.slice";
import { v4 as createUuid } from "uuid"
import apple from "/apple_level_One.png"
import { Alert, Grid, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar"
import StatusGain from "../components/StatusGain";
import { reStartChallenge } from "../store/modules/challenge.slice";

const PlayRoom = () => {

    const dispatch = useAppDispatch()
    const theme = useTheme()

    const operationRedux = useAppSelector((state) => state.operations)
    const resultLastOperation = useAppSelector((state) => state.challenges)
    const targetValueLastStatement = useAppSelector((state) => state.cards.targetCurrentStatement)
    const lastSelectedCardsRedux = useAppSelector(state => state.cards.lastSelectedCards)
    const challengeRedux = useAppSelector(state => state.challenges)
    const resTartTimeRedux = useAppSelector(state => state.challenges.actionTimer)

    const [renderCards, setRenderCards] = useState<CardType[]>([])
    const [operation, setOperation] = useState<"+" | "-" | "x" | "÷" | null>(null)
    const [countdown, setCountdown] = useState<number>(8);
    const [isPaused, setIsPaused] = useState<boolean>(false)
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [itRight, setItRight] = useState<boolean | null>(null)
    const [challenge, setChallenge] = useState<boolean>(false)
    const [reStartTime, setRestartTime] = useState<boolean>(false)


    const reStart = () => {
        if (reStartTime) {
            setCountdown(8)
            setCountdown(countdown - 1)
            return countdown
        }
        return
    }

    const startTimer = () => {
        setTimeout(() => {
            if (isPaused) {
                setCountdown(countdown)
            }
            else {
                if (countdown !== 0) {
                    setCountdown(countdown - 1)
                    return countdown
                }
                else if (countdown === 0) {
                    setIsPaused(true)
                    return setCountdown(0)
                }
            }
        }, 1000)

    }

    const handleNumbers = () => {
        dispatch(clearSelectedCards(lastSelectedCardsRedux[0]))
        const newCards: CardType[] = [];

        for (let i = 1; i <= 10; i++) {
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            const cardId = createUuid();

            const newCard: CardType = {
                cardId: cardId,
                numberCard: randomNumber,
                operation: operationRedux.operationLevel,
                img: apple
            };
            newCards.push(newCard);
        }
        dispatch(getCards(newCards));
        return newCards
    };

    const notIsSelectedPair = lastSelectedCardsRedux.length <= 1
    const checkResult = targetValueLastStatement === resultLastOperation.equations.result

    const handleConfirmSelection = () => {
        if (countdown === 0) {
            setAlertMessage("Oh não! Tempo esgotado")
            setOpenAlert(true)
            setItRight(false)
            dispatch(reStartChallenge(true))
            dispatch(clearSelectedCards(lastSelectedCardsRedux[0]))
        }
        if (notIsSelectedPair && countdown !== 0) {
            setAlertMessage('Você não selecionou um par de cartas para o resultado')
            setOpenAlert(true)
            dispatch(reStartChallenge(true))
        }
        else if (checkResult) {
            setItRight(true)
            // setIsPaused(true)
        }
        else {
            setItRight(false)
        }
    }

    // useEffect(() => {
    //     if (reStartTime) {
    //         reStart()
    //     }
    // }, [reStartTime])

    useEffect(() => {
        startTimer();

        if (countdown === 0 && !itRight) {
            setItRight(false)
            setAlertMessage("Oh não! Tempo esgotado")
            setOpenAlert(true)
        }
    }, [renderCards, countdown, isPaused, itRight])

    useEffect(() => {
        const resultCards = handleNumbers()
        setOperation(operationRedux.operationLevel)
        setRenderCards(resultCards)

    }, [operation])

    return (
        <>
            <div style={{ backgroundColor: theme.palette.secondary.main, alignItems: 'center', width: '100vw', height: '100%' }}>
                {
                    challenge ? (
                        <>
                            <ChallengeLevel renderCards={renderCards} children={
                                <>
                                    <Grid container sx={{ flexDirection: 'column', paddingTop: '20px' }} className={countdown !== 0 ? "styleTimer" : "pausedStyleTimer"}>
                                        {countdown}<span style={{ padding: '0px 0px 0px 8px', fontFamily: "Verdana,sans-serif", fontSize: '16px' }}>segundos</span>
                                    </Grid>
                                    <DisplayScore score={0} />
                                </>
                            } button={<ButtonDefault action={handleConfirmSelection} customStyle={'buttonConfirm'} label={'Confirmar'} styleWidth={'60%'} styleHeight={60} />} />
                        </>
                    ) :
                        itRight !== null ?
                            <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                                <StatusGain timer={() => setRestartTime(resTartTimeRedux)} right={itRight} actionChallenge={() => setChallenge(challengeRedux.newChallenge)} />
                            </div>
                            : (
                                <>
                                    <ChallengeLevel renderCards={renderCards} children={
                                        <>
                                            <Grid container sx={{ flexDirection: 'column', paddingTop: '20px' }} className={countdown !== 0 ? "styleTimer" : "pausedStyleTimer"}>
                                                {countdown}<span style={{ padding: '0px 0px 0px 8px', fontFamily: "Verdana,sans-serif", fontSize: '16px' }}>segundos</span>
                                            </Grid>
                                            <DisplayScore score={0} />
                                        </>
                                    } button={<ButtonDefault action={handleConfirmSelection} customStyle={'buttonConfirm'} label={'Confirmar'} styleWidth={'60%'} styleHeight={60} />} />
                                </>
                            )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openAlert} autoHideDuration={2200} onClose={() => setOpenAlert(false)}>
                    <Alert variant='filled' onClose={() => setOpenAlert(false)} severity="warning">
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default PlayRoom