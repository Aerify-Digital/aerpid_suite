import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';

export default function Console({ output }: { output: string }) {
  const connection = useConnectionContext();
  const [autoScroll, setAutoScroll] = useState(true);
  const terminalRef = useRef(null!);
  const theme = useTheme();
  const StyledPaper = styled(Paper)(() => ({
    background: theme.palette.background.default,
    fontFamily: 'monospace',
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    overflow: 'auto',
    width: '100%',
    height: '60vh',
    maxHeight: '60vh',
    '&::-webkit-scrollbar': {
      width: '7px',
      height: '7px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '4px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  }));
  useEffect(() => {
    if (terminalRef.current && autoScroll) {
      setTimeout(() => {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 0);
    }
  }, [output, autoScroll]);

  return (
    <Paper sx={{ m: 2, p: 1 }}>
      <Grid item>
        <Typography variant="overline">
          {connection.port}:{connection.baudRate}
        </Typography>
      </Grid>
      <Grid item container direction="row">
        <Grid item xs={12}>
          <StyledPaper ref={terminalRef}>
            <div>{output}</div>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} textAlign="right">
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={autoScroll}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => {
                  setAutoScroll(checked);
                }}
              />
            }
            label="Auto Scroll"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
