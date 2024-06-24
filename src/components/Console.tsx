import { FormControlLabel, Grid, Paper, Switch } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

const StyledPaper = styled(Paper)({
  fontFamily: 'monospace',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  margin: 'auto',
  overflow: 'auto',
  maxHeight: '75vh',
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
});

export default function Console({ output }: { output: string }) {
  const [autoScroll, setAutoScroll] = useState(true);
  const terminalRef = useRef(null!);

  useEffect(() => {
    if (terminalRef.current && autoScroll) {
      setTimeout(() => {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }, 0);
    }
  }, [output, autoScroll]);

  return (
    <Grid item container direction="row">
      <Grid item xs={12} textAlign="left">
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
      <Grid item xs={12}>
        <StyledPaper ref={terminalRef}>
          <div style={{ marginBottom: '3px', marginTop: '3px' }}>{output}</div>
        </StyledPaper>
      </Grid>
    </Grid>
  );
}
