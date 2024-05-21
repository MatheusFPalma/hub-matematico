
import { useSpring, animated } from "react-spring";
import logoMatic from '/logoMatic.svg';
import backgroundSplash from '/backgroundSplash.png';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { Colors } from "../components/utils/colors";
import simbolAdd from "/simbol-add.svg"
import simbolIqual from "/simbol-Iqual.svg"
import simbolPoligon from '/simbol-poligon.svg'
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

export default function ScreenSplash() {
    const [open, setOpen] = useState(false);
    const [currentBackground, setCurrentBackground] = useState('')
    const [showLogo, setShowLogo] = useState(false);
    const navigate = useNavigate()

    const setBackground = () => {
        if (!open) {
            setTimeout(() => {
                setCurrentBackground(backgroundSplash)
            }, 1000)
            setTimeout(() => {
                setShowLogo(true)
            }, 1800)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true)
        }, 1000)
        setBackground()
        return () => clearTimeout(timer);
    }, [])

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    }

    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 3800)
        setTimeout(() => {
            navigate('/onboarding')
        }, 4100)
    }, [])

    const backgroundProps = useSpring({
        from: { backgroundPosition: '0% 0%', background: Colors.offWhite },
        to: { backgroundPosition: '0% 30% 100% ', background: '#fff' },
        config: { duration: 6000 }
    });


    return (
        <Box sx={{ backgroundColor: Colors.offWhite, width: "100vw", height: '100vh' }}>
            <Drawer
                anchor={"left"}
                open={open}
                onClose={() => toggleDrawer(false)}
            >
                <animated.div style={{ ...backgroundProps, width: '100vw', height: '100vh', transition: 'allow-discrete' }}>
                    <Box className='styleSplash'
                        sx={{ display: 'flex', width: "100vw", height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundImage: `url(${currentBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                    >
                        <Grid item sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '100vw', height: '80%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                            <Grid sx={{ display: 'center', flexWrap: 'wrap', alignItems: 'center', height: '50%', justifyContent: 'center' }}>
                                <img className={showLogo ? "styleAdd" : 'addHide'} src={simbolAdd} width={'10%'} height={'10%'} alt='simbolAdd' />
                                <img style={{ zIndex: '1' }} className={showLogo ? 'animateLogo' : 'fixedLogo'} src={logoMatic} alt='logoMatic' />
                                <img className={showLogo ? "styleIqual" : 'iqualHide'} src={simbolIqual} width={'10%'} height={'10%'} alt='simbolIqual' />
                                <img className={showLogo ? "stylePoligon" : 'polygonHide'} src={simbolPoligon} width={'12%'} height={'12%'} alt='simbolPoligon' />
                            </Grid>
                        </Grid>
                    </Box>
                </animated.div>
            </Drawer>
        </Box>
    );
}



