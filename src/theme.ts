import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        light: '#8be9fd',
        main: '#8be9fd',
        dark: '#8be9fd'
      },
      secondary: {
        main: '#bd93f9',
        dark: '#bd93f9'
      },
      text: {
        primary: '#f8f8f2',
        secondary: '#f8f8f2',
        disabled: '#f8f8f2'
      },
      background: {
        paper: '#44475a',
        default: '#282a36'
      }
    }
  });

export default theme;
