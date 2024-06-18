// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

ipcRenderer.on('update-menu', (event, isConnected) => {
  console.log('Received update-menu event with:', isConnected);
  event.sender.send('request-update-menu', isConnected);
});

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: async () => {
    return await ipcRenderer.invoke('app-version');
  },
  listSerialPorts: async () => {
    return await ipcRenderer.invoke('list-serial-ports');
  },
  sendSerial: async (data: Buffer | Uint8Array | number[]) => {
    return await ipcRenderer.invoke('send-serial', data);
  },
  setSerialPort: async (path: string, baudRate: number) => {
    return await ipcRenderer.invoke('set-serial-port', path, baudRate);
  },
  getSerialPort: async () => {
    return await ipcRenderer.invoke('get-serial-port');
  },
  connect: async () => {
    return await ipcRenderer.invoke('connect-serial-port');
  },
  disconnect: async () => {
    return await ipcRenderer.invoke('disconnect-serial-port');
  }
});
