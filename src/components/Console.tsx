import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

const StyledPaper = styled(Paper)({
  fontFamily: 'monospace',
  whiteSpace: 'pre',
  margin: 'auto',
  paddingLeft: '5px',
  marginTop: '10px',
  overflow: 'auto',
  height: 'calc(80vh)',
  width: 'calc(98vw)',
  '&::-webkit-scrollbar': {
    width: '7px',
    height: '7px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent' // Change this to the color of the container if you don't want it to be transparent
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
    <>
      <div
        style={{ marginRight: '26px', marginTop: '2px', textAlign: 'right' }}
      >
        <input
          type="checkbox"
          checked={autoScroll}
          onChange={() => setAutoScroll(!autoScroll)}
        />
        <label>Auto Scroll</label>
      </div>
      <StyledPaper ref={terminalRef}>
        <div style={{ marginBottom: '3px', marginTop: '3px' }}>{output}</div>
      </StyledPaper>
    </>
  );
}
