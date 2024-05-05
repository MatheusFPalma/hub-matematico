import ButtonDefault from './ButtonDefault'
import happy from '/happy.png'
import sad from '/sad.png'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material'

interface StatusGainProps {
    right: boolean | null
    children?: React.ReactNode
}



const StatusGain: React.FC<StatusGainProps> = ({ right, children }) => {
    const theme = useTheme()




    return (
        <>
            <Grid container sx={{ paddingTop: '80px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {children}
                <div style={{ zIndex: '-3', display: 'flex', width: '100%', height: '210px', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', textAlign: 'center', borderTopRightRadius: '30px', borderTopLeftRadius: '30px' }}>
                    {right ? <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: theme.palette.secondary.main }}>Você acertou</span> : <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '32px', fontWeight: 600, color: '#B92B0C' }}>Tente novamente</span>}
                </div>
                <img style={{ display: 'flex', width: '100%', height: '40%', justifyContent: 'center', alignItems: 'center' }} src={right ? happy : sad} alt='statusGain' />
            </Grid>
            {right ? (
                <ButtonDefault customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
            ) :
                <>
                    <ButtonDefault customStyle={'buttonMakeAgain'} label={'Refazer'} styleWidth={'100%'} styleHeight={60} />
                    <ButtonDefault customStyle={'buttonConfirm'} label={'Continuar'} styleWidth={'100%'} styleHeight={60} />
                </>
            }
        </>
    )
}

export default StatusGain