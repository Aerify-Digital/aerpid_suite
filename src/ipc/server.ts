/* eslint-disable @typescript-eslint/no-var-requires */
import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import { SerialPort } from 'serialport';
import { AutoDetectTypes, PortInfo } from '@serialport/bindings-cpp';
import { InterByteTimeoutParser } from '@serialport/parser-inter-byte-timeout';
import Constants from '../constants';
import Operation from '../enum/Operation';
import SerialCommand from '../enum/SerialCommand';

/**
 *
 * @param data
 * @returns
 */
const encodeBuffer = (data: Buffer) => {
  const arr = [Constants.START_BYTE];
  let dlength = 0;
  for (const byte of data) {
    if (dlength > Constants.MAX_MESSAGE_SIZE) {
      throw new Error('Message exceeds MAX_MESSAGE_SIZE');
    }

    switch (byte) {
      case Constants.START_BYTE:
      case Constants.END_BYTE:
      case Constants.ESCAPE_BYTE:
        arr.push(Constants.ESCAPE_BYTE);
        arr.push(byte ^ Constants.ESCAPE_BYTE);
        dlength += 2;
        break;
      default:
        arr.push(byte);
        dlength++;
        break;
    }
  }
  arr.push(Constants.END_BYTE);
  return Buffer.from(arr);
};

/**
 *
 * @param data
 * @returns
 */
const decodeBuffer = (data: Buffer) => {
  if (data[0] !== Constants.START_BYTE) throw new Error('Invalid data');
  if (data[data.length - 1] !== Constants.END_BYTE) {
    throw new Error('Invalid data');
  }

  const arr = [];
  let endOfMessage = false;
  for (let i = 0; i < data.length; i++) {
    if (endOfMessage) break;
    switch (data[i]) {
      case Constants.START_BYTE:
        break;
      case Constants.END_BYTE:
        endOfMessage = true;
        break;
      case Constants.ESCAPE_BYTE:
        ++i;
        arr.push(data[i] ^ Constants.ESCAPE_BYTE);
        break;
      default:
        arr.push(data[i]);
        break;
    }
  }
  return Buffer.from(arr);
};

let currentPort: PortInfo | undefined = undefined;
let stream: SerialPort<AutoDetectTypes> | undefined = undefined;
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export const setup = (mainWindow: BrowserWindow) => {
  ipcMain.handle('connect-serial-port', async (event: IpcMainInvokeEvent) => {
    event.sender.send(
      'serial-console',
      Buffer.from(
        `Serial connection opened ${stream.settings.path}:${stream.settings.baudRate}`
      )
    );
    event.sender.send('update-menu', true);
    return true;
  });

  ipcMain.handle(
    'disconnect-serial-port',
    async (event: IpcMainInvokeEvent) => {
      if (stream && stream.isOpen) {
        stream.close(async (err: Error | null) => {
          if (err) {
            console.log('Error: ', err.message);
            stream = undefined;
          } else {
            event.sender.send('update-menu', false);
            await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
          }
        });
      }

      return true;
    }
  );

  ipcMain.handle('app-version', (event: IpcMainInvokeEvent, ...args: any[]) => {
    return require('../../package.json')
      ? require('../../package.json').version
      : '';
  });

  ipcMain.handle(
    'list-serial-ports',
    async (event: IpcMainInvokeEvent, ...args: any[]) => {
      const ports = await SerialPort.list();
      return ports;
    }
  );

  ipcMain.handle(
    'send-serial',
    async (event: IpcMainInvokeEvent, data: string) => {
      stream.write(encodeBuffer(Buffer.from(data)), 'utf8');
    }
  );

  ipcMain.handle(
    'set-serial-port',
    async (event: IpcMainInvokeEvent, path: string, baudRate: number) => {
      const autoOpen = false;
      const endOnClose = true;
      const port = new SerialPort({
        path,
        baudRate,
        autoOpen,
        endOnClose
      });

      port.open(async (err: Error | null) => {
        if (err) {
          console.log('Error: ', err.message);
          stream = undefined;
          return undefined;
        } else {
          port.set({ dtr: false, rts: false });
          if (process.env.NODE_ENV === 'development') {
            console.log(
              `Serial connection opened ${port.settings.path}:${port.settings.baudRate}`
            );
          }
          setTimeout(
            async () =>
              await port.port.write(
                encodeBuffer(Buffer.from([SerialCommand.INIT, Operation.GET]))
              ),
            2000
          );

          event.sender.send(
            'serial-console',
            Buffer.from(
              `Serial connection opened ${port.settings.path}:${port.settings.baudRate}`
            )
          );
        }
      });
      port.on('close', async (err: any) => {
        if (err) {
          console.log(err);
        }
        if (!port.isOpen) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Serial connection closed');
          }
          await mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
          event.sender.send(
            'serial-console',
            Buffer.from('Serial connection closed')
          );
          currentPort = undefined;
          stream = undefined;
        }
      });
      const parser = port.pipe(
        new InterByteTimeoutParser({ interval: 60, maxBufferSize: 16384 })
      );

      parser.on('data', function (data: Buffer) {
        if (
          data.length >= 3 &&
          data[0] === Constants.START_BYTE &&
          data[data.length - 1] === Constants.END_BYTE &&
          data.length <= Constants.MAX_MESSAGE_SIZE
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.log(
              `[serial-data] ${data.length} bytes\nraw: ${data.toString(
                'hex'
              )}\ndecoded: ${decodeBuffer(data).toString('hex')}`
            );
          }
          event.sender.send('serial-data', decodeBuffer(data));
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[serial-console] ${data.toString()}`);
          }
          event.sender.send('serial-console', data);
        }
      });

      const ports = (await SerialPort.list()).filter(
        (info: PortInfo) => info.path === port.path && port.opening
      );
      currentPort = ports.length > 0 ? ports[0] : undefined;
      stream = port ? port : undefined;
      return currentPort;
    }
  );

  ipcMain.handle(
    'get-serial-port',
    async (event: IpcMainInvokeEvent, ...args: any[]) => {
      return currentPort;
    }
  );
};
