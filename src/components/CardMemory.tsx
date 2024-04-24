import { Box, Paper, Typography, useTheme } from '@mui/material'
import "../App.css";

interface CardMemoryProps {
    value: number | undefined
    figure: string
    operation?: React.ReactNode
    action: (value: number | undefined) => void
}

const CardMemory: React.FC<CardMemoryProps> = ({ value, figure, operation, action }) => {
    const theme = useTheme()

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
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main
                },
            }}
        >
            <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => action(value)}>
                    <Typography style={{ width: '40px', height: '40px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '38px', fontWeight: 600, color: theme.palette.secondary.main }} className='styleNumberCard'>{value} <span style={{ display: 'flex', paddingLeft: '5px', alignItems: 'center', height: '40px', width: '25px', fontSize: '40px' }}>{operation}</span></Typography>
                    <img style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '40px', height: '38px' }} src={figure} alt='apple' />
                </button>
            </Paper>
        </Box>
    )
}

export default CardMemory