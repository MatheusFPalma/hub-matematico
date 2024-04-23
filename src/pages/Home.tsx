import { Box, Grid, Typography } from "@mui/material"
import "../App.css"
import CardMemory from "../components/CardMemory"
import apple from "/apple_level_One.png"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import signalIqual from "/signal_iqual.png"
import CardResult from "../components/CardResult"

const Home = () => {
    const isOnHomePage = window.location.pathname === "/cards";

    if (isOnHomePage) {
        document.body.classList.add("homepage");
    } else {
        document.body.classList.remove("homepage");
    }

    const dispatch = useAppDispatch()
    const operationRedux = useAppSelector((state) => state.operations)
    const [resultEquation, setResultEquation] = useState<number | null>(null)
    const [renderCards, setRenderCards] = useState<number[]>([])
    const [renderOperation, setOperation] = useState<string>('')
    const [statement, setStatement] = useState<string>('')

    const handleStatement = () => {
        const firstCard = renderCards[0];
        const secondCard = renderCards[1];
        const targetValue = firstCard + secondCard;
        const operationText = operationRedux.operationLevel === "adicao" ? "somatória" : operationRedux.operationLevel === "multiplicacao" ? "multiplicação" : "";

        setStatement(`Selecione os cards cuja ${operationText} de maçãs resultem em ${targetValue} unidades.`);
        // setResultEquation(targetValue);
    };
    function handleCards(): number[] {
        let cards: number[] = []
        for (let i = 1; i < 11; i++) {
            const randomNumber = Math.floor(Math.random() * 10)
            cards.push(randomNumber);
        }
        return cards
    }
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
        const resultCards = handleCards()
        changeOperation()
        setRenderCards(resultCards)
        handleStatement()
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
                    {renderCards.map((item, index) => (
                        <CardMemory key={index} value={item} operation={renderOperation} figure={apple} />
                    ))}
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