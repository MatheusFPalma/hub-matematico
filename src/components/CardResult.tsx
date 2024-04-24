import { Box, Paper, Typography, useTheme } from "@mui/material"
import { useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"

interface CardResultProps {
    value: number | undefined
}

const CardResult: React.FC<CardResultProps> = ({ value }) => {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    width: 80,
                    height: 138,
                    borderRadius: 4,
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.primary.main
                },
            }}
        >
            <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography style={{ width: '45px', height: '25px', justifyContent: 'center', display: 'flex', alignItems: 'center', fontFamily: 'Fredoka', fontSize: '42px', fontWeight: 600 }} className='styleNumberCard'>{value}</Typography>
            </Paper>
        </Box>
    )
}

export default CardResult