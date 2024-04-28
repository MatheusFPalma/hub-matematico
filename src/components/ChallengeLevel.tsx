import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import CardMemory from "./CardMemory"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CardType, getCards, removeLastSelectedCard, setLastSelectedCard } from "../store/modules/cards.slice";
import signalIqual from "/signal_iqual.png"
import apple from "/apple_level_One.png"
import { v4 as createUuid } from "uuid"
import GroupOperationLevel from "./GroupOperationLevel";
import CardResult from "./CardResult";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";

interface ChallengeLevelProps {
    children?: React.ReactNode
}

const ChallengeLevel: React.FC<ChallengeLevelProps> = ({ children }) => {

    const dispatch = useAppDispatch()
    const operationRedux = useAppSelector((state) => state.operations)

    const [renderCards, setRenderCards] = useState<CardType[]>([])

    const [simbolOperation, setSimbolOperation] = useState<string>('')
    const [statement, setStatement] = useState<string>('')
    const [firstCard, setFirstCard] = useState<number>(0);
    const [secondCard, setSecondCard] = useState<number>(0);
    const [allRight, setAllRight] = useState<boolean>(true)
    const [selectedPair, setSelectedPair] = useState<boolean>(false);
    const [resultEquation, setResultEquation] = useState<number>(0)


    const historyEquations = useAppSelector((state) => state.challenges.historyEquations)
    const lastEquationResult = historyEquations.length > 0 ? historyEquations[historyEquations.length - 1].result : 0
    const lastSelectedCardsRedux = useAppSelector(state => state.cards.lastSelectedCards)


    useEffect(() => {

        setResultEquation(lastEquationResult)
    }, [lastEquationResult, firstCard, resultEquation, secondCard])


    const handleCardClick = (card: CardType) => {
        const isSelected = lastSelectedCardsRedux.some((c) => c.cardId === card.cardId);
        if (isSelected) {
            dispatch(removeLastSelectedCard(card)); // Remove a carta clicada do array
        } else {
            if (lastSelectedCardsRedux.length < 2) {
                // Adiciona a carta clicada
                dispatch(setLastSelectedCard(card));
            } else {
                // Se o array já tiver duas cartas, remove-as antes de adicionar a nova
                setSelectedPair(true);
                dispatch(removeLastSelectedCard(lastSelectedCardsRedux[0]));
                dispatch(setLastSelectedCard(card));
            }
        }


        if (!lastSelectedCardsRedux.length) {
            setFirstCard(card.numberCard)
            setSecondCard(lastSelectedCardsRedux[1].numberCard)
        }
        if (secondCard === 0 && firstCard !== 0) {
            setSecondCard(card.numberCard)
        }
        // if (firstCard === 0) {
        //     setFirstCard(card.numberCard);

        // }

        // if (isSelected && secondCard === 0) {
        //     setFirstCard(0)
        //     setSecondCard(firstCard)
        // }
        // if (firstCard === 0) {
        //     setFirstCard(card.numberCard);
        // }
        if (firstCard !== 0 && secondCard !== 0 && !selectedPair) {
            setFirstCard(0)
            setSecondCard(0)
        }
        else if (secondCard === 0) {
            setSecondCard(card.numberCard);
            setSelectedPair(true); // Indica que o par de cartas foi selecionado
        }
        // else if (lastSelectedCardsRedux.length === 1) {
        //     setFirstCard(lastSelectedCardsRedux[0].numberCard);
        //     setSecondCard(lastSelectedCardsRedux[1].numberCard)
        // }

        else if (selectedPair) {
            setFirstCard(secondCard);
            setSecondCard(card.numberCard);
        }
        else {
            setSelectedPair(true)
            setFirstCard(lastSelectedCardsRedux[0].numberCard);
            setSecondCard(lastSelectedCardsRedux[1].numberCard);
        }
    }


    const handleNumbers = () => {
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
            case '¹/x':
                setSimbolOperation('¹/x')
                break;
        }
    }


    useEffect(() => {
        if (renderCards.length > 2) {
            // Se ambas as cartas foram selecionadas
            setSelectedPair(true)
            setAllRight(true)
            const firstCardStatement = Number(renderCards[2].numberCard.toFixed(2));
            const secondCardStatement = Number(renderCards[6].numberCard.toFixed(2));

            if (firstCardStatement !== 0 && secondCardStatement !== 0) {
                const targetValue = simbolOperation === '+' ? firstCardStatement + secondCardStatement : simbolOperation === '-' ? firstCardStatement - secondCardStatement : simbolOperation === 'x' ? firstCardStatement * secondCardStatement : firstCardStatement / secondCardStatement

                const operationText = operationRedux.operationLevel === "+" ? "somatória" : operationRedux.operationLevel === "x" ? "multiplicação" : operationRedux.operationLevel === "÷" ? "divisão" : "subtracao";
                setStatement(`Selecione os cards cuja ${operationText} de maçãs resultem em ${targetValue.toFixed(2)} unidades.`);

            }
        }
        else {
            setAllRight(false)
            setStatement("Aguarde enquanto os cartões estão sendo gerados...");
        }

    }, [firstCard, secondCard, operationRedux.operationLevel, allRight])


    useEffect(() => {
        const resultCards = handleNumbers()
        changeOperation()
        setRenderCards(resultCards)

    }, [operationRedux.operationLevel, simbolOperation])

    // const lastSelectedCards = useAppSelector(state => state.cards.lastSelectedCards)

    // lastSelectedCards.find(item => item === renderCards.find(item => item.cardId)?.cardId)
    // const tesMap = lastSelectedCards.map(item => item)

    // console.log(renderCards)
    console.log(firstCard)
    console.log(secondCard)
    console.log(resultEquation)
    // console.log(lastSelectedNumbers)
    console.log(lastEquationResult)
    // console.log(tesMap)

    return (
        <>
            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                <Grid item sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    {children}
                </Grid>
                <Grid container item sx={{ marginTop: '5px', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <Link to={'/tutorial'}><ChevronLeftIcon sx={{ display: 'flex', width: '35px', padding: '20px 40px 0px 40px', height: '35px', marginTop: '5px', color: '#fff', alignItems: 'flex-start' }} /></Link>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', padding: '20px 40px 0px 40px', alignItems: 'center', textAlign: 'center' }}>
                    <Typography sx={{ marginTop: '10px', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '26px', color: '#F5EBFF' }}>{statement}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '40px 40px 10px' }}>
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
            </Box>
        </>
    )
}

export default ChallengeLevel