import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#f5f5f5',
            dark: "#2b3b2b",
            light: "#A4CAA4"
        },
        secondary: {
            main: '#365435',
            light: '#fbfefb',
            contrastText: '#bf5a10',
        },
    },
});


export default defaultTheme