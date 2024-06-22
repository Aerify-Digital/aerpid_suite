/* eslint-disable @typescript-eslint/no-var-requires */
import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron';
import Store from 'electron-store';
import { SerialPort } from 'serialport';
import { AutoDetectTypes, PortInfo } from '@serialport/bindings-cpp';
import { InterByteTimeoutParser } from '@serialport/parser-inter-byte-timeout';
import Constants from '../constants';
import Operation from '../enum/Operation';
import SerialCommand from '../enum/SerialCommand';
import { encodeBuffer, decodeBuffer } from '../utils/BufferUtils';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

export default class Server {
  private currentPort: PortInfo | undefined;
  private stream: SerialPort<AutoDetectTypes> | undefined;
  private version = require('../../package.json')
    ? require('../../package.json').version
    : '';
  private store: Store<Record<string, any>>;

  constructor(private mainWindow: BrowserWindow) {
    this.store = new Store<Record<string, any>>({
      defaults: {
        theme: 'dark',
        checkForUpdates: true,
        checkFirmwareOnConnect: true
      }
    });
  }

  getVersion() {
    return this.version;
  }

  async disconnectSerialPort(event?: IpcMainInvokeEvent) {
    if (this.stream && this.stream.isOpen) {
      this.stream.close(async (err: Error | null) => {
        if (err) {
          console.log('Error: ', err.message);
          this.stream = undefined;
        } else {
          event.sender.send('update-menu', false);
          this.stream = undefined;
          this.currentPort = undefined;
          await this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        }
      });
    }

    return true;
  }

  setup() {
    ipcMain.handle('getStoreValue', (event, key) => {
      return (this.store as Record<string, any>).get(key);
    });

    ipcMain.handle('setStoreValue', (event, key, value) => {
      return (this.store as Record<string, any>).set(key, value);
    });

    ipcMain.handle('connect-serial-port', async (event: IpcMainInvokeEvent) => {
      event.sender.send('update-menu', true);
      return true;
    });

    ipcMain.handle(
      'disconnect-serial-port',
      async (event: IpcMainInvokeEvent) => {
        if (this.stream && this.stream.isOpen) {
          try {
            this.stream.close(async (err: Error | null) => {
              if (err) {
                console.log('Error: ', err.message);
                this.stream = undefined;
                this.currentPort = undefined;
              } else {
                event.sender.send('update-menu', false);
                this.stream = undefined;
                this.currentPort = undefined;
                this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
              }
            });
          } catch (e) {
            console.log('Error: ', e.message);
            this.stream = undefined;
            this.currentPort = undefined;
          }
        } else {
          event.sender.send('update-menu', false);
          this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
          return true;
        }
        return true;
      }
    );

    ipcMain.handle(
      'app-version',
      (event: IpcMainInvokeEvent, ...args: any[]) => {
        return this.version;
      }
    );

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
        this.stream.write(encodeBuffer(Buffer.from(data)), 'utf8');
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
            this.stream = undefined;
            return undefined;
          } else {
            port.set({ dtr: false, rts: false });
            if (process.env.NODE_ENV === 'development') {
              console.log(
                `Serial connection opened ${port.settings.path}:${port.settings.baudRate}`
              );
            }
            event.sender.send(
              'serial-console',
              Buffer.from(
                `Serial connection opened ${port.settings.path}:${port.settings.baudRate}`
              )
            );
            setTimeout(async () => {
              event.sender.send(
                'serial-console',
                Buffer.from(
                  `Sending INIT command on ${port.settings.path}:${port.settings.baudRate}`
                )
              );
              await port.port.write(
                encodeBuffer(Buffer.from([SerialCommand.INIT, Operation.GET]))
              );
            }, 5000);
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
            await this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
            event.sender.send(
              'serial-console',
              Buffer.from('Serial connection closed')
            );
            this.currentPort = undefined;
            this.stream = undefined;
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
        this.currentPort = ports.length > 0 ? ports[0] : undefined;
        this.stream = port ? port : undefined;
        return this.currentPort;
      }
    );

    ipcMain.handle(
      'get-serial-port',
      async (event: IpcMainInvokeEvent, ...args: any[]) => {
        return this.currentPort;
      }
    );
  }
}
