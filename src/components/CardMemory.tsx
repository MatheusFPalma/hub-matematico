import { Box, Paper, Typography, useTheme } from '@mui/material'
import "../App.css";
import { useEffect, useState } from 'react';

interface CardMemoryProps {
    value: number | undefined
    figure: string
    operation?: React.ReactNode
    action: (value: number | undefined) => void
}

const CardMemory: React.FC<CardMemoryProps> = ({ value, figure, operation, action }) => {
    const theme = useTheme()
    const [clicked, setClicked] = useState(false);


    // useEffect(() => {
    //     // Resetar o estado 'clicked' quando a propriedade 'value' for alterada
    //     setClicked(false);
    // }, [value]);

    const handleClick = () => {
        setClicked(!clicked); // Alternar o estado ao clicar no card
        action(value); // Chamar a função de ação fornecida
    };


    // const handleClick = () => {
    //     if (selectedCardIndex === null) {
    //         // Se nenhuma carta foi selecionada, selecionar a carta atual
    //         setSelectedCardIndex(index);
    //         action(index, value);
    //     } else if (selectedCardIndex === index) {
    //         // Se a carta atual já foi selecionada, desmarcar a seleção
    //         setSelectedCardIndex(null);
    //         action(index, undefined);
    //     } else {
    //         // Se outra carta foi selecionada, trocar a seleção
    //         setSelectedCardIndex(index);
    //         action(index, value);
    //     }
    // };

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
                    backgroundColor: clicked ? theme.palette.secondary.contrastText : theme.palette.secondary.light,
                },
            }}
        >
            <Paper className='styleCard' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => handleClick()}>
                    <Typography style={{ width: '40px', height: '40px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '38px', fontWeight: 600, color: clicked ? '#fff' : theme.palette.secondary.main }}>{value} <span style={{ display: 'flex', paddingLeft: '5px', alignItems: 'center', height: '40px', width: '25px', fontSize: '40px' }}>{operation}</span></Typography>
                    <img style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '40px', height: '38px' }} src={figure} alt='apple' />
                </button>
            </Paper>
        </Box>
    )
}

export default CardMemory