import { ContextBridge, IpcRenderer } from 'electron';
import SystemState, { emptyColor } from '../interface/SystemState';
import LedMode from '../enum/LedMode';
import InitData from '../interface/InitData';
import SerialCommand from '../enum/SerialCommand';
import { parseInitMessage } from '../utils/BufferUtils';
import Led from '../enum/Led';

const defaultState: SystemState = {
  INITIALIZED: false,
  MODEL: 0,
  VERSION: '-',
  NET_VERSION: '-',
  HOSTNAME: '-',
  UPTIME: 0,
  TEMP: 0,
  SET_TEMP: 0,
  AVG_TEMP: 0,
  BUMP: {
    enabled: false,
    length: 0,
    amount: 0
  },
  COIL: {
    enabled: false,
    P: 0.0,
    I: 0.0,
    D: 0.0
  },
  LED: {
    enabled: true,
    mode: LedMode.PULSE,
    color: emptyColor,
    brightness: 0,
    status: false
  },
  FAV_1: {
    name: 'Fav 1',
    temp: 0
  },
  FAV_2: {
    name: 'Fav 2',
    temp: 0
  },
  FAV_3: {
    name: 'Fav 3',
    temp: 0
  },
  FAV_4: {
    name: 'Fav 4',
    temp: 0
  }
};

export default class Client {
  private static instance: Client;
  private state: SystemState;
  private serialSubscribers: ((data: Readonly<Buffer>) => void)[];
  private constructor(
    private ipcRenderer: IpcRenderer,
    contextBridge: ContextBridge
  ) {
    this.state = defaultState;
    this.serialSubscribers = [];
    ipcRenderer.on(
      'serial-console',
      (event: Electron.IpcRendererEvent, data: Buffer) => {
        const buf: Readonly<Buffer> = Buffer.from(data);
        for (const callback of this.serialSubscribers) {
          callback(buf);
        }
      }
    );

    ipcRenderer.on(
      'serial-data',
      (event: Electron.IpcRendererEvent, data: Buffer) => {
        const buf: Readonly<Buffer> = Buffer.from(data);
        this.handleSerial(buf);
      }
    );

    ipcRenderer.on('update-menu', (event, isConnected) => {
      event.sender.send('request-update-menu', isConnected);
    });
    contextBridge.exposeInMainWorld('pidState', {
      data: () => this.state
    });

    contextBridge.exposeInMainWorld('electronStore', {
      get: (key: string) => {
        return ipcRenderer.invoke('getStoreValue', key);
      },
      set: (key: string, value: any) => {
        return ipcRenderer.invoke('setStoreValue', key, value);
      }
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
      },
      openExternal: async (url: string) => {
        return await ipcRenderer.invoke('open-external', url);
      },
      subscribeToSerial: (callback: (data: Buffer) => void) => {
        if (!this.serialSubscribers.includes(callback)) {
          this.serialSubscribers.push(callback);
        }
      },
      unsubscribeFromSerial: (callback: (data: Buffer) => void) => {
        const index = this.serialSubscribers.indexOf(callback);
        if (index > -1) {
          this.serialSubscribers.splice(index, 1);
        }
      }
    });
  }
  public static getInstance(
    ipcRenderer: IpcRenderer,
    contextBridge: ContextBridge
  ): Client {
    if (!Client.instance) {
      Client.instance = new Client(ipcRenderer, contextBridge);
    }
    return Client.instance;
  }

  getState(): SystemState {
    return this.state;
  }

  async init(initData: InitData) {
    this.state.BUMP.length = initData.bumpTime;
    this.state.BUMP.amount = initData.bumpTemp;
    this.state.BUMP.enabled = initData.BUMP_ENABLED;
    this.state.LED.enabled = initData.LIGHTS_ENABLED;
    this.state.LED.color = initData.ledColor;
    this.state.LED.brightness = initData.ledBrightness;
    this.state.LED.status = initData.ledStatus;
    this.state.COIL.enabled = initData.COIL_ENABLED;
    this.state.COIL.P = initData.P;

    this.state.COIL.I = initData.I;

    this.state.COIL.D = initData.D;

    this.state.FAV_1 = { name: initData.fav1Name, temp: initData.fav1Temp };

    this.state.FAV_2 = { name: initData.fav2Name, temp: initData.fav2Temp };

    this.state.FAV_3 = { name: initData.fav3Name, temp: initData.fav3Temp };

    this.state.FAV_4 = { name: initData.fav4Name, temp: initData.fav4Temp };
    this.state.MODEL = initData.deviceModel;

    this.state.VERSION = initData.ver;

    this.state.NET_VERSION = initData.verNet;
    this.state.HOSTNAME = initData.hostname;

    this.state.UPTIME = initData.uptime;

    this.state.TEMP = initData.temp;

    this.state.SET_TEMP = initData.setTemp;

    this.state.AVG_TEMP = initData.avgTemp;
    this.state.INITIALIZED = true;
  }

  async handleSerial(data: Readonly<Buffer>) {
    console.log(`[serial-data] ${data.toString('hex')}`);
    switch (data[0]) {
      case SerialCommand.INIT:
        {
          const initData = parseInitMessage(data.toJSON().data.slice(1));
          await this.init(initData);
          this.ipcRenderer.send(
            'serial-console',
            Buffer.from('Received INIT command')
          );
          this.ipcRenderer.send(
            'check-firmware-update',
            initData.deviceModel,
            initData.ver
          );
        }
        break;
      case SerialCommand.AUTO_OFF_LENGTH:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received AUTO_OFF_LENGTH command')
        );
        break;
      case SerialCommand.AUTO_OFF_TOGGLE:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from(`Toggled auto-off ${data[1] ? 'on' : 'off'}`)
        );
        break;
      case SerialCommand.ADJUST_AMOUNT:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received ADJUST_AMOUNT command')
        );
        break;
      case SerialCommand.BLE:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received BLE command')
        );
        break;
      case SerialCommand.BUMP_AMOUNT:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received BUMP_AMOUNT command')
        );
        break;
      case SerialCommand.BUMP_LENGTH:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received BUMP_LENGTH command')
        );
        break;
      case SerialCommand.BUMP_TOGGLE:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from(`Toggled bump ${data[1] ? 'on' : 'off'}`)
        );
        break;
      case SerialCommand.COIL_TOGGLE:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from(`Toggled coil ${data[1] ? 'on' : 'off'}`)
        );
        this.state.COIL.enabled = data[1] > 0 ? true : false;
        break;
      case SerialCommand.ESP:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received ESP command')
        );
        break;
      case SerialCommand.FAV_1:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received FAV_1 command')
        );
        break;
      case SerialCommand.FAV_2:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received FAV_2 command')
        );
        break;
      case SerialCommand.FAV_3:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received FAV_3 command')
        );
        break;
      case SerialCommand.FAV_4:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received FAV_4 command')
        );
        break;
      case SerialCommand.LED:
        switch (data[1]) {
          case Led.BRIGHTNESS:
            this.ipcRenderer.send(
              'serial-console',
              Buffer.from('Received Led.BRIGHTNESS command')
            );
            break;
          case Led.COLOR:
            this.ipcRenderer.send(
              'serial-console',
              Buffer.from('Received Led.COLOR command')
            );
            break;
          case Led.ENABLE:
            this.ipcRenderer.send(
              'serial-console',
              Buffer.from('Received Led.ENABLE command')
            );
            this.state.LED.enabled = data[2] > 0 ? true : false;
            break;
          case Led.MODE:
            this.ipcRenderer.send(
              'serial-console',
              Buffer.from('Received Led.MODE command')
            );
            break;
        }
        break;
      case SerialCommand.PID:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received PID command')
        );
        break;
      case SerialCommand.TEMP:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received TEMP command')
        );
        break;
      case SerialCommand.WIFI:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from('Received WIFI command')
        );
        break;
      default:
        this.ipcRenderer.send(
          'serial-console',
          Buffer.from(`Received unknown command: ${data[0]}`)
        );
        break;
    }
  }
}
