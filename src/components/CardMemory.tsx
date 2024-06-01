import { Box, Paper, Typography, useTheme } from '@mui/material'
import "../App.css";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { CardType, removeLastSelectedCard, setLastSelectedCard } from '../store/modules/cards.slice';

interface CardMemoryProps {
    action: (value: number | undefined) => void
    card: CardType
}

const CardMemory: React.FC<CardMemoryProps> = ({ card, action }) => {
    const theme = useTheme()

    const dispatch = useAppDispatch()

    const lastSelectedCards = useAppSelector((state) => state.cards.lastSelectedCards);
    const isSelected = lastSelectedCards.some((c) => c.cardId === card.cardId);

    const handleClick = () => {
       /* isSelected ? dispatch(removeLastSelectedCard(card)) : dispatch(setLastSelectedCard(card));*/
        action(card.numberCard); // Chamar a função de ação fornecida
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 78,
                    height: 118,
                    borderRadius: 4,
                    backgroundColor: isSelected ? theme.palette.secondary.contrastText : theme.palette.secondary.light,
                },
            }}
        >
            <Paper className='styleCard' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => handleClick()}>
                    {isSelected ? (
                        <Typography style={{ width: '40px', height: '40px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '38px', fontWeight: 600, color: isSelected ? '#fff' : theme.palette.secondary.main }}>
                            {card.numberCard}
                            <span style={{ display: 'flex', paddingLeft: '5px', alignItems: 'center', height: '40px', width: '25px', fontSize: '40px' }}>
                                {card.operation}
                            </span>
                        </Typography>
                    ) : (
                        <div style={{ width: '40px', height: '40px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '38px', fontWeight: 600, color: theme.palette.secondary.main }}>
                            ?
                        </div>
                    )}
                    {isSelected && <img style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '40px', height: '38px' }} src={card.img} alt='apple' />}
                </button>
            </Paper>
        </Box>
    )
}

export default CardMemory