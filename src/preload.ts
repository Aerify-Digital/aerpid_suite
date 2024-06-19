// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import SerialCommand from './enum/SerialCommand';
import InitData from './interface/InitData';
import Led from './enum/Led';
import SystemState, { RGBColor, emptyColor } from './interface/SystemState';
import LedMode from './enum/LedMode';

let state: SystemState = {
  INITIALIZED: false,
  VERSION: '-',
  NET_VERSION: '-',
  HOSTNAME: '-',
  UPTIME: 0,
  TEMP: 0,
  SET_TEMP: 0,
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
    brightness: 0
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
const getNumber: (data: Readonly<number[]>) => number = (
  data: Readonly<number[]>
) => {
  return Number(`0x${Buffer.from(data).toString('hex')}`);
};

const doubleToBytes = (inputNumber: number) => {
  const buffer = new ArrayBuffer(8); // 8 bytes for a double
  const view = new DataView(buffer);
  view.setFloat64(0, inputNumber, true); // 'true' for little-endian

  return new Uint8Array(buffer);
};

const bytesToDouble = (bytes: Uint8Array) => {
  if (bytes.length !== 8) {
    throw new Error(
      'Input byte array must be 8 bytes in length to represent a double.'
    );
  }

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);

  for (let i = 0; i < 8; i++) {
    view.setUint8(i, bytes[i]);
  }

  return parseFloat(view.getFloat64(0, true).toFixed(3));
};

const parseInitMessage: (data: Readonly<number[]>) => InitData = (
  data: Readonly<number[]>
) => {
  const ver = data.slice(0, 3);
  const verNet = data.slice(3, 6);
  const ipAddr = data.slice(6, 10);
  const ssid = Buffer.from(data.slice(10, 42))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const hostname = Buffer.from(data.slice(42, 295))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const uptime = getNumber(data.slice(295, 299));
  const bumpTemp = getNumber(data.slice(299, 301));
  const bumpTime = getNumber(data.slice(301, 303));
  const autoOffTime = getNumber(data.slice(303, 305));
  const ledMode = data.slice(305, 306)[0];
  const ledColor: RGBColor = data.slice(306, 309) as RGBColor;
  const ledBrightness = data.slice(309, 310)[0];
  const fav1Name = Buffer.from(data.slice(310, 374))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const fav1Temp = getNumber(data.slice(374, 376));
  const fav2Name = Buffer.from(data.slice(376, 440))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const fav2Temp = getNumber(data.slice(440, 442));
  const fav3Name = Buffer.from(data.slice(442, 506))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const fav3Temp = getNumber(data.slice(506, 508));
  const fav4Name = Buffer.from(data.slice(508, 572))
    .toString('utf8')
    .replace(/\u0000/g, '')
    .trim();
  const fav4Temp = getNumber(data.slice(572, 574));
  const tempAdjustAmt = data.slice(574, 575)[0];
  const temp = getNumber(data.slice(575, 577));
  const setTemp = getNumber(data.slice(577, 579));
  const P = bytesToDouble(Uint8Array.from(data.slice(579, 587)));
  const I = bytesToDouble(Uint8Array.from(data.slice(587, 595)));
  const D = bytesToDouble(Uint8Array.from(data.slice(595, 603)));

  const booleanMap = [...Array(8)].map((_, i) =>
    Boolean(data.slice(603)[0] & (1 << (7 - i)))
  );
  const [
    AUTO_OFF_ENABLED,
    COIL_ENABLED,
    LIGHTS_ENABLED,
    BUMP_ENABLED,
    WIFI_ENABLED,
    SSID_SET,
    BT_ENABLED,
    _UNUSED_4
  ] = booleanMap;

  return {
    ver: `${ver[0]}.${ver[1]}.${ver[2]}`,
    verNet: `${verNet[0]}.${verNet[1]}.${verNet[2]}`,
    ipAddr: `${ipAddr[0]}.${ipAddr[1]}.${ipAddr[2]}.${ipAddr[3]}`,
    ssid,
    hostname,
    uptime,
    bumpTemp,
    bumpTime,
    autoOffTime,
    ledMode,
    ledColor,
    ledBrightness,
    fav1Name,
    fav1Temp,
    fav2Name,
    fav2Temp,
    fav3Name,
    fav3Temp,
    fav4Name,
    fav4Temp,
    tempAdjustAmt,
    temp,
    setTemp,
    P,
    I,
    D,
    AUTO_OFF_ENABLED,
    COIL_ENABLED,
    BUMP_ENABLED,
    LIGHTS_ENABLED,
    WIFI_ENABLED,
    SSID_SET,
    BT_ENABLED
  };
};

const cToF = (celsius: number) => ((celsius / 10) * 9) / 5 + 32;

const cToK = (celsius: number) => celsius / 10 + 273.15;

const init = async (initData: InitData) => {
  console.log(JSON.stringify(initData, null, 2));
  state.BUMP.length = initData.bumpTime;
  state.BUMP.amount = initData.bumpTemp;
  state.BUMP.enabled = initData.BUMP_ENABLED;
  state.LED.enabled = initData.LIGHTS_ENABLED;
  state.LED.color = initData.ledColor;
  state.LED.brightness = initData.ledBrightness;

  state.COIL.enabled = initData.COIL_ENABLED;
  state.COIL.P = initData.P;

  state.COIL.I = initData.I;

  state.COIL.D = initData.D;

  state.FAV_1 = { name: initData.fav1Name, temp: initData.fav1Temp };

  state.FAV_2 = { name: initData.fav2Name, temp: initData.fav2Temp };

  state.FAV_3 = { name: initData.fav3Name, temp: initData.fav3Temp };

  state.FAV_4 = { name: initData.fav4Name, temp: initData.fav4Temp };

  state.VERSION = initData.ver;

  state.NET_VERSION = initData.verNet;
  state.HOSTNAME = initData.hostname;

  state.UPTIME = initData.uptime;

  state.TEMP = initData.temp;

  state.SET_TEMP = initData.setTemp;
};

const handleSerial = async (data: Readonly<Buffer>) => {
  console.log(`[serial-data] ${data.toString('hex')}`);
  switch (data[0]) {
    case SerialCommand.INIT:
      const initData = parseInitMessage(data.toJSON().data.slice(1));
      await init(initData);
      break;
    case SerialCommand.AUTO_OFF_LENGTH:
      break;
    case SerialCommand.AUTO_OFF_TOGGLE:
      console.log(`Toggled auto-off ${data[1] ? 'on' : 'off'}`);
      break;
    case SerialCommand.ADJUST_AMOUNT:
      break;
    case SerialCommand.BLE:
      break;
    case SerialCommand.BUMP_AMOUNT:
      break;
    case SerialCommand.BUMP_LENGTH:
      break;
    case SerialCommand.BUMP_TOGGLE:
      console.log(`Toggled bump ${data[1] ? 'on' : 'off'}`);
      break;
    case SerialCommand.COIL_TOGGLE:
      console.log(`Toggled coil ${data[1] ? 'on' : 'off'}`);
      state.COIL.enabled = data[1] > 0 ? true : false;

      if (document.getElementById('toggle_heat')) {
        const element = document.getElementById('toggle_heat');
        if (data[1] > 0) {
          element.style.setProperty('background-color', '#faa843', 'important');
          element.style.setProperty('color', 'whitesmoke', 'important');
        } else {
          element.style.removeProperty('background-color');
          element.style.removeProperty('color');
        }
      }

      break;
    case SerialCommand.ESP:
      break;
    case SerialCommand.FAV_1:
      break;
    case SerialCommand.FAV_2:
      break;
    case SerialCommand.FAV_3:
      break;
    case SerialCommand.FAV_4:
      break;
    case SerialCommand.LED:
      switch (data[1]) {
        case Led.BRIGHTNESS:
          break;
        case Led.COLOR:
          break;
        case Led.ENABLE:
          state.LED.enabled = data[2] > 0 ? true : false;
          console.log(`Toggled LED ${data[2] ? 'on' : 'off'}`);
          break;
        case Led.MODE:
          break;
      }
      break;
    case SerialCommand.PID:
      break;
    case SerialCommand.TEMP:
      break;
    case SerialCommand.WIFI:
      break;
    default:
      break;
  }
};

ipcRenderer.on(
  'serial-console',
  (event: Electron.IpcRendererEvent, data: Buffer) => {
    const buf: Readonly<Buffer> = Buffer.from(data);
    console.log(`[serial-console] ${buf.toString()}`);
  }
);

ipcRenderer.on(
  'serial-data',
  (event: Electron.IpcRendererEvent, data: Buffer) => {
    const buf: Readonly<Buffer> = Buffer.from(data);
    handleSerial(buf);
  }
);

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
