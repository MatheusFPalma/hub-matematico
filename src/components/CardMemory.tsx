import { Box, Paper, Typography, useTheme } from '@mui/material'
import "../App.css";

interface CardMemoryProps {
    value: number | undefined | React.ReactNode;
    figure: string
    operation?: React.ReactNode
}

const CardMemory: React.FC<CardMemoryProps> = ({ value, figure, operation }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 68,
                    height: 108,
                    borderRadius: 4,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main
                },
            }}
        >
            <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ width: '40px', height: '40px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '24px', fontWeight: 600 }} className='styleNumberCard'>{value} <span style={{ display: 'flex', paddingLeft: '5px', alignItems: 'center', height: '40px', fontSize: '18px' }}>{operation}</span></Typography>
                <img style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '38px', height: '33px' }} src={figure} alt='apple' />
            </Paper>
        </Box>
    )
}

export default CardMemory