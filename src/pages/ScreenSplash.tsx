
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import logoMatic from '/logoMatic.svg';
import backgroundSplash from '/backgroundSplash.png';
import { Colors } from "../components/utils/colors";
import { useNavigate } from "react-router-dom";


const ScreenSplash = () => {

    const [showLogo, setShowLogo] = useState(false);
    const [showBackground, setShowBackground] = useState(true);
    const [showScreen, setShowScreen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setShowBackground(false);
            setShowScreen(true);
            setShowLogo(true);
        }, 1000);
        setTimeout(() => {
            navigate("/onboarding")
        }, 2800)
    }, []);

    const backgroundProps = useSpring({
        from: { backgroundPosition: '20% 0%', background: Colors.offWhite, },
        to: { backgroundPosition: showBackground ? '0% 20%' : '100% 0%', background: showBackground ? Colors.offWhite : '' },
        config: { duration: 200 }
    });

    const logoProps = useSpring({
        to: async (next) => {
            await next({ opacity: showLogo ? 1 : 0 });
            await next({ transform: showLogo ? 'rotate(360deg)' : 'rotate(0deg)' });
        },
        from: { opacity: 0 },
        config: { duration: 300 }
    });

    return (
        <Box>
            <animated.div style={{
                ...backgroundProps, width: '100vw', height: '100vh', backgroundSize: 'cover'
            }}>

                <Box sx={{ backgroundSize: 'cover', flexDirection: 'column', display: 'flex', width: '100vw', height: '100vh', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="blur-border" style={{ display: 'flex', height: '190px', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={showBackground ? Colors.offWhite : backgroundSplash} alt='backgroundTheme' style={{ width: '100vw', height: '100%' }} />
                    </div>
                    {showScreen && (
                        <animated.div style={logoProps}>
                            <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <img width={'100%'} height={"100%"} src={logoMatic} alt='logoMatic' />
                            </div>
                        </animated.div>
                    )}
                    <div className="blur-border" style={{ display: 'flex', height: '190px', width: '100%', flexDirection: 'column', alignItems: 'center', justifySelf: 'flex-end' }}>
                        <img src={showBackground ? Colors.offWhite : backgroundSplash} alt='' style={{ width: '100vw', height: '100%' }} />
                    </div>
                </Box>

            </animated.div>
        </Box>
    )
}

export default ScreenSplash
