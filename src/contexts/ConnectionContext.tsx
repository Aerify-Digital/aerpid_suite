import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

export type ContextualConnection = {
  serialConsole: string[];
  initialized: boolean;
  connected: boolean;
  connecting: boolean;
  connect: () => void;
  disconnect: () => void;
  ports: string[];
  updatePorts: () => void;
  port: string;
  setPort: (port: string) => void;
  baudRate: number;
  setBaudRate: (baudRate: number) => void;
};

export const ConnectionContext = createContext<
  ContextualConnection | undefined
>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [port, setPort] = useState('none');
  const [ports, setPorts] = useState([] as string[]);
  const [baudRate, setBaudRate] = useState(115200);
  const MAX_LINES = 10000;
  const [serialConsole, setSerialConsole] = useState<string[]>([]);
  const serialCallback = useCallback((data: Buffer) => {
    const text = String.fromCharCode(...data);
    setSerialConsole((lines) => {
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

  const navigate = useNavigate();

  const updatePorts = async () => {
    const api = (window as any).electronAPI;
    const p = await api.listSerialPorts();
    setPorts(p.map((port: { path: string }) => port.path));
  };

  const connect = async () => {
    const api = (window as any).electronAPI;
    setConnecting(true);
    if (port === 'port_devdummy') {
      // Dummy port for development
      const connected = await api.connect();
      if (!connected) {
        console.error('Failed to connect');
        setConnecting(false);
        setInitialized(false);
        navigate('/');
        return;
      }
      setConnected(true);
      setInitialized(true);
    } else if (port != 'none') {
      await api.setSerialPort(port, baudRate);
      const connected = await api.connect();
      if (!connected) {
        console.error('Failed to connect');
        setConnecting(false);
        setInitialized(false);
        navigate('/');
        return;
      }
      setConnected(true);
      setInitialized(true);
    } else {
      console.error('Port not selected');
    }
    setConnecting(false);
  };

  const disconnect = async () => {
    if (port === 'port_devdummy') {
      setConnected(false);
      setConnecting(false);
      setInitialized(false);
      setPort('none');
      setBaudRate(115200);
      setSerialConsole([]);
      navigate('/');
    } else {
      const api = (window as any).electronAPI;
      const disconnected = await api.disconnect();
      if (disconnected) {
        setConnected(false);
        setConnecting(false);
        setInitialized(false);
        setPort('none');
        setBaudRate(115200);
        setSerialConsole([]);
        navigate('/');
      } else {
        console.error('Failed to disconnect');
      }
    }
  };

  useEffect(() => {
    updatePorts();
  }, []);

  useEffect(() => {
    if (connected) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [connected]);

  return (
    <ConnectionContext.Provider
      value={{
        serialConsole,
        initialized,
        connected,
        connecting,
        connect,
        disconnect,
        ports,
        updatePorts,
        port,
        setPort,
        baudRate,
        setBaudRate
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export const useConnectionContext = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error(
      'useConnectionContext must be used within a ConnectionProvider'
    );
  }
  return context;
};
