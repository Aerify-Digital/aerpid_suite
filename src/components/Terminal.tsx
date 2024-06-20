import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';

const StyledPaper = styled(Paper)({
  fontFamily: 'monospace',
  whiteSpace: 'pre',
  backgroundColor: '#282a36',
  color: '#f8f8f2',
  margin: '12px',
  overflow: 'auto',
  height: 'calc(100vh - 50px)',
  width: 'calc(100vw - 26px)',
  '&::-webkit-scrollbar': {
    width: '7px',
    height: '7px'
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1'
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555'
  }
});

export default function Terminal({ output }: { output: string }) {
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
        <div>{output}</div>
      </StyledPaper>
    </>
  );
}
