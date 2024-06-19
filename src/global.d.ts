import { PortInfo } from '@serialport/bindings-cpp';
import SystemState from './interface/SystemState';

interface ElectronWindow extends Window {
  pidState: { data: () => SystemState };
  electronAPI: {
    getAppVersion: () => Promise<string>;
    listSerialPorts: () => Promise<PortInfo[]>;
    sendSerial: (data: Buffer | Uint8Array | number[]) => Promise<void>;
    setSerialPort: (path: string, baudRate: number) => Promise<void>;
    getSerialPort: () => Promise<PortInfo | undefined>;
    connect: () => Promise<boolean>;
    disconnect: () => Promise<boolean>;
  };
}

declare const window: ElectronWindow;
