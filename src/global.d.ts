interface ElectronWindow extends Window {
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
