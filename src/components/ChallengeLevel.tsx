import { Alert, Box, CircularProgress, Grid, Snackbar, Typography } from "@mui/material"
import CardMemory from "./CardMemory"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CardType, removeLastSelectedCard, setLastSelectedCard, valueCurrentStatement } from "../store/modules/cards.slice";
import signalIqual from "/signal_iqual.png"
import GroupOperationLevel from "./GroupOperationLevel";
import CardResult from "./CardResult";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import calculateTargetValue from "./utils/statementUtils";

interface ChallengeLevelProps {
    children?: React.ReactNode
    renderCards: CardType[]
    button: React.ReactNode
}

const ChallengeLevel: React.FC<ChallengeLevelProps> = ({ children, renderCards, button }) => {

    const dispatch = useAppDispatch()
    const operationRedux = useAppSelector((state) => state.operations)

    const [simbolOperation, setSimbolOperation] = useState<string | null>('')
    const [statement, setStatement] = useState<string>('')
    const [firstCard, setFirstCard] = useState<number>(0);
    const [secondCard, setSecondCard] = useState<number>(0);
    const [allRight, setAllRight] = useState<boolean>(true)
    const [selectedPair, setSelectedPair] = useState<boolean>(false);
    const [resultEquation, setResultEquation] = useState<number>(0)
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')

    const resultLastOperation = useAppSelector((state) => state.challenges)
    const lastSelectedCardsRedux = useAppSelector(state => state.cards.lastSelectedCards)


    const handleCardClick = (card: CardType) => {
        const isSelected = lastSelectedCardsRedux.some((item) => item.cardId === card.cardId)
        if (isSelected) {
            dispatch(removeLastSelectedCard(card))
            if (firstCard === card.numberCard) {
                // Se for, limpa o valor de firstCard
                setFirstCard(0);
            } else if (secondCard === card.numberCard) {
                // Se for, limpa o valor de secondCard
                setSecondCard(0);
            }
        }

        else {
            if (lastSelectedCardsRedux.length === 2) {
                setSelectedPair(true);
                setAlertMessage('Retire a seleção de uma das cartas para mudar sua escolha');
                setOpenAlert(true);
                return;
            }
            else {
                if (lastSelectedCardsRedux.length === 1) {
                    // Atualiza o firstCard com o card selecionado anteriormente
                    setFirstCard(lastSelectedCardsRedux[0].numberCard);
                }
                dispatch(setLastSelectedCard(card));
                setSecondCard(card.numberCard);
            }
        }
    }


    const changeOperation = () => {
        switch (operationRedux.operationLevel) {
            case '+':
                setSimbolOperation('+')
                break;
            case '-':
                setSimbolOperation('-')
                break;
            case 'x':
                setSimbolOperation('x')
                break;
            case '÷':
                setSimbolOperation('÷')
                break;
        }
    }

    const currentStatement = () => {
        if (renderCards.length > 2) {
            // Se ambas as cartas foram selecionadas
            setSelectedPair(true)
            setAllRight(true)
            const firstCardStatement = Number(renderCards[0].numberCard.toFixed(2));
            const secondCardStatement = Number(renderCards[1].numberCard.toFixed(2));

            if (firstCardStatement !== 0 && secondCardStatement !== 0) {
                const targetValue = calculateTargetValue(firstCardStatement, secondCardStatement, simbolOperation);

                const text: Record<'+' | '-' | 'x' | '÷', string> = {
                    '+': 'somatória',
                    '-': 'subtração',
                    'x': 'multiplicação',
                    '÷': 'divisão'
                }
                const operationText = text[operationRedux.operationLevel!]
                setStatement(`Selecione os cards cuja ${operationText} de maçãs resultem em ${Number(targetValue.toFixed(2))} unidades.`);
                dispatch(valueCurrentStatement(targetValue))
                return targetValue
            }
        }
        else {
            setAllRight(false)
            setStatement("Aguarde enquanto os cartões estão sendo gerados...");
        }
    }

    useEffect(() => {
        const lastEquationResult = resultLastOperation.equations.result
        setSimbolOperation(resultLastOperation.equations.operation)
        setResultEquation(lastEquationResult)
    }, [firstCard, resultEquation, secondCard, lastSelectedCardsRedux])


    useEffect(() => {
        currentStatement()
    }, [firstCard, secondCard, operationRedux.operationLevel, simbolOperation, allRight])


    useEffect(() => {
        changeOperation()
    }, [operationRedux.operationLevel, simbolOperation])


    return (
        <>
            <Box minHeight={"100vh"}
                width={"100vw"}
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}>
                <Box padding={"30px"}
                    display={"flex"}
                    flexDirection={"column"}>
                    <Grid item sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Grid container item sx={{ marginTop: '5px', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                            <Link to={'/tutorial'}><ChevronLeftIcon sx={{ display: 'flex', width: '35px', padding: '20px 40px 0px 40px', height: '35px', marginTop: '5px', color: '#fff', alignItems: 'flex-start' }} /></Link>
                        </Grid>
                        {children}
                    </Grid>
                    <Box display={"grid"}
                        gap={"20px"}
                        alignItems={"center"}>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center', padding: '20px 40px 0px 40px', alignItems: 'center', textAlign: 'center' }}>
                            <Typography sx={{ marginTop: '10px', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '26px', color: '#F5EBFF' }}>{statement}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', margin: '40px 40px 10px' }}>
                            {allRight ? (renderCards.map((item) => (
                                <CardMemory card={item} action={() => handleCardClick(item)} key={item.cardId} />
                            ))) : (<CircularProgress color="inherit" />)}
                        </Grid>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img style={{ width: '20px', height: '20px', marginRight: '10px' }} src={signalIqual} alt='signalIqual' />
                            {firstCard !== null && secondCard !== null && (
                                <>
                                    <GroupOperationLevel firstCard={firstCard} secondCard={secondCard} operation={simbolOperation} />
                                    <CardResult value={resultEquation} />
                                </>
                            )}
                        </Grid>
                        {button}
                    </Box>
                    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openAlert} autoHideDuration={2000} onClose={() => setOpenAlert(false)}>
                        <Alert variant='filled' onClose={() => setOpenAlert(false)} severity="warning">
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        </>
    )
}

export default ChallengeLevel