import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useCallback, useEffect, useState } from 'react';
import Terminal from '../components/Terminal';

export default function SerialTerminal() {
  const MAX_LINES = 10000;
  const [outputLines, setOutputLines] = useState<string[]>([]);

  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);
  const serialCallback = useCallback((data: Buffer) => {
    const text = String.fromCharCode(...data);
    setOutputLines((lines) => {
      const newLines = [...lines, ...text.split(/\r?\n/)];
      if (newLines.length > MAX_LINES) {
        newLines.splice(0, newLines.length - MAX_LINES);
      }
      return newLines;
    });
  }, []);

  useEffect(() => {
    const api = (window as any).electronAPI;
    api.subscribeToSerial(serialCallback);
    return () => {
      api.unsubscribeFromSerial(serialCallback);
    };
  }, []);

  return connection.connected ? (
    <Terminal output={outputLines.join('\n')} />
  ) : (
    <></>
  );
}
