import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import CardMemory from "./CardMemory"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CardType, getCards } from "../store/modules/cards.slice";
import signalIqual from "/signal_iqual.png"
import apple from "/apple_level_One.png"
import { v4 as createUuid } from "uuid"
import GroupOperationLevel from "./GroupOperationLevel";
import CardResult from "./CardResult";

const ChallengeLevel = () => {

    const dispatch = useAppDispatch()
    const operationRedux = useAppSelector((state) => state.operations)
    const [renderCards, setRenderCards] = useState<CardType[]>([])
    const [simbolOperation, setSimbolOperation] = useState<string>('')
    const [statement, setStatement] = useState<string>('')
    const [firstCard, setFirstCard] = useState<number>(0);
    const [secondCard, setSecondCard] = useState<number>(0);
    const [allRight, setAllRight] = useState<boolean>(true)
    const [selectedPair, setSelectedPair] = useState<boolean>(false);

    const handleCardClick = (value: number) => {
        if (!selectedPair) {
            if (firstCard === 0) {
                setFirstCard(value);
            } else if (secondCard === 0) {
                setSecondCard(value);
                setSelectedPair(true); // Indica que o par de cartas foi selecionado
            }
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
                operation: simbolOperation,
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

    const isPossible = (targetValue: number, cards: CardType[]) => {
        // Verifica se é possível obter o targetValue com os números das cartas disponíveis
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++) {
                if (cards[i].numberCard + cards[j].numberCard === targetValue) {
                    return true;
                }
            }
        }
        return false;
    };

    useEffect(() => {
        if (renderCards.length > 2) {
            // Se ambas as cartas foram selecionadas
            setAllRight(true)
            const firstCard = renderCards[2].numberCard;
            const secondCard = renderCards[1].numberCard;
            const targetValue = firstCard + secondCard;
            const operationText = operationRedux.operationLevel === "+" ? "somatória" : operationRedux.operationLevel === "x" ? "multiplicação" : operationRedux.operationLevel === "÷" ? "divisão" : "subtracao";
            setStatement(`Selecione os cards cuja ${operationText} de maçãs resultem em ${targetValue} unidades.`);

            if (!isPossible(targetValue, renderCards)) {
                // Se não for possível obter a resposta com as cartas disponíveis, gerar um novo conjunto de cartas
                setFirstCard(0);
                setSecondCard(0);
                setSelectedPair(false);
                setRenderCards(handleNumbers());
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


    }, [operationRedux.operationLevel])


    const historyEquations = useAppSelector((state) => state.challenges.historyEquations)
    const lastEquationResult = historyEquations.length > 0 ? historyEquations[historyEquations.length - 1].result : 0

    const [resultEquation, setResultEquation] = useState<number>()

    useEffect(() => {
        setResultEquation(lastEquationResult)
    }, [resultEquation, lastEquationResult])

    console.log(historyEquations)
    return (
        <>
            <Grid item sx={{ marginTop: '40px', padding: '20px 20px 0px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ marginTop: '60px', fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '26px', color: '#F5EBFF' }}>{statement}</Typography>
            </Grid>
            <Box className={'backgroundScreen'} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flow', flexFlow: 'column' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '40px 40px 10px' }}>
                    {allRight ? (renderCards.map((item) => (
                        <CardMemory action={() => handleCardClick(item.numberCard)} key={item.cardId} value={item.numberCard} operation={simbolOperation} figure={apple} />
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