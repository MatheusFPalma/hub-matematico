import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#fcfffb',
            dark: "#000",
            light: "##A4CAA4"
        },
        secondary: {
            main: '#365435',
            light: '#F5EBFF',
            contrastText: '#bf5a10',
        },
    },
});


export default defaultTheme