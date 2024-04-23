import { Box, Grid, Typography } from "@mui/material"
import "../App.css"
import CardMemory from "../components/CardMemory"
import apple from "/apple_level_One.png"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import signalIqual from "/signal_iqual.png"
import CardResult from "../components/CardResult"
import { CardType, getCards } from "../store/modules/cards.slice"
import { v4 as createUuid } from "uuid"
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Home = () => {
    const isOnHomePage = window.location.pathname === "/cards";

    if (isOnHomePage) {
        document.body.classList.add("homepage");
    } else {
        document.body.classList.remove("homepage");
    }

    const dispatch = useAppDispatch()
    const operationRedux = useAppSelector((state) => state.operations)
    const cardsRedux = useAppSelector((state) => state.cards)
    const [resultEquation, setResultEquation] = useState<number | null>(null)
    const [renderCards, setRenderCards] = useState<CardType[]>([])
    const [renderOperation, setOperation] = useState<string>('')
    const [statement, setStatement] = useState<string>('')

    const handleStatement = () => {
        if (renderCards.length >= 2) {
            const firstCard = renderCards[0].numberCard;
            const secondCard = renderCards[1].numberCard;
            const targetValue = firstCard + secondCard;
            const operationText = operationRedux.operationLevel === "adicao" ? "somatória" : operationRedux.operationLevel === "multiplicacao" ? "multiplicação" : "";

            setStatement(`Selecione os cards cuja ${operationText} de maçãs resultem em ${targetValue} unidades.`);
        }
        else {
            setStatement("Aguarde enquanto os cartões estão sendo gerados ...")
        }
        // setResultEquation(targetValue);
    };


    const handleNumbers = () => {
        const newCards: CardType[] = [];

        for (let i = 1; i <= 10; i++) {
            const randomNumber = Math.floor(Math.random() * 10);
            const cardId = createUuid();

            const newCard: CardType = {
                cardId: cardId,
                numberCard: randomNumber,
                operation: renderOperation,
                img: apple
            };
            newCards.push(newCard);
        }
        dispatch(getCards(newCards));
        return newCards
    };

    const changeOperation = () => {
        switch (operationRedux.operationLevel) {
            case 'adicao':
                setOperation('+')
                break;
            case 'subtracao':
                setOperation('-')
                break;
            case 'multiplicacao':
                setOperation('x')
                break;
            case 'divisao':
                setOperation('÷')
                break;
            case 'fracao':
                setOperation('¹/x')
                break;
        }
    }

    useEffect(() => {
        const resultCards = handleNumbers()
        changeOperation()
        setRenderCards(resultCards)
    }, [])

    useEffect(() => {
        handleStatement()
    }, [renderCards])

    return (
        <>
            <Grid item sx={{ marginTop: '60px', padding: '20px 20px 0px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: '26px', color: '#F5EBFF' }}>{statement}</Typography>
            </Grid>
            <Box className={'backgroundScreen'} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flow', flexFlow: 'column' }}>
                <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: '40px 40px 10px' }}>
                    {renderCards.length > 0 ? renderCards.map((item) => (
                        <CardMemory key={item.cardId} value={item.numberCard} operation={renderOperation} figure={apple} />
                    )) : <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img style={{ width: '20px', height: '20px', marginRight: '10px' }} src={signalIqual} alt='signalIqual' />
                    <CardResult value={resultEquation} />
                </Grid>
            </Box>
        </>
    )
}

export default Home