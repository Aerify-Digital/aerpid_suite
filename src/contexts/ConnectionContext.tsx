import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

export type ContextualConnection = {
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
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [port, setPort] = useState('none');
  const [ports, setPorts] = useState([] as string[]);
  const [baudRate, setBaudRate] = useState(115200);

  const navigate = useNavigate();

  const updatePorts = async () => {
    const p = await (
      window as unknown as ElectronWindow
    ).electronAPI.listSerialPorts();
    setPorts(p.map((port: { path: string }) => port.path));
  };

  const connect = async () => {
    const api = (window as unknown as ElectronWindow).electronAPI;
    setConnecting(true);
    if (port != 'none') {
      await api.setSerialPort(port, baudRate);
      const connected = await api.connect();
      if (!connected) {
        console.error('Failed to connect');
        setConnecting(false);
        navigate('/');
        return;
      }
      setConnected(true);
    } else {
      console.error('Port not selected');
    }
    setConnecting(false);
  };

  const disconnect = async () => {
    const api = (window as unknown as ElectronWindow).electronAPI;
    const disconnected = await api.disconnect();
    if (disconnected) {
      setConnected(false);
      setConnecting(false);
      setPort('none');
      setBaudRate(115200);
      navigate('/');
    } else {
      console.error('Failed to disconnect');
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
