import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode,
      error: {
        light: '#fc9694',
        main: '#ff5555',
        dark: '#7e3b42'
      },
      warning: {
        light: '#fcd2a2',
        main: '#ffb86c',
        dark: '#7e634c'
      },
      primary: {
        light: '#246bb2',
        main: mode === 'dark' ? '#8be9fd' : '#246bb2',
        dark: '#8be9fd'
      },
      secondary: {
        light: '#9073be',
        main: 'dark' ? '#bd93f9' : '#9073be',
        dark: '#bd93f9'
      },
      text: {
        primary: mode === 'dark' ? '#f8f8f2' : '#282a36',
        secondary: mode === 'dark' ? '#f8f8f2' : '#282a36',
        disabled: '#6272a4'
      },
      background: {
        paper: mode === 'dark' ? '#44475a' : '#dadde2',
        default: mode === 'dark' ? '#282a36' : '#f8f8f2'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            '&:hover': {
              backgroundColor: mode === 'dark' ? '#b7eff9' : '#6394db'
            }
          }
        }
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            color: '#c0c0c0'
          }
        }
      }
    }
  });

export default theme;
