import InitData from '../interface/InitData';
import Constants from '../constants';
import RGBColor from '../type/RGBColor';
import { getNumber, bytesToDouble } from './NumberUtils';

/**
 *
 * @param data
 * @returns
 */
export const encodeBuffer = (data: Buffer) => {
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
export const decodeBuffer = (data: Buffer) => {
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

/**
 *
 * @param data
 * @returns
 */
export const parseInitMessage: (data: Readonly<number[]>) => InitData = (
  data: Readonly<number[]>
) => {
  const ver = data.slice(0, 3);
  const verNet = data.slice(3, 6);
  const ipAddr = data.slice(6, 10);
  const ssid = Buffer.from(data.slice(10, 42))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const hostname = Buffer.from(data.slice(42, 295))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const uptime = getNumber(data.slice(295, 299));
  const bumpTemp = getNumber(data.slice(299, 301));
  const bumpTime = getNumber(data.slice(301, 303));
  const autoOffTime = getNumber(data.slice(303, 305));
  const ledMode = data.slice(305, 306)[0];
  const ledStatus = data.slice(306, 307)[0] >= 1; //TODO: move this to the boolean bitmap
  const ledColor: RGBColor = data.slice(307, 310) as RGBColor;
  const ledBrightness = data.slice(310, 311)[0];
  const fav1Name = Buffer.from(data.slice(311, 375))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const fav1Temp = getNumber(data.slice(375, 377));
  const fav2Name = Buffer.from(data.slice(377, 441))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const fav2Temp = getNumber(data.slice(441, 443));
  const fav3Name = Buffer.from(data.slice(443, 507))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const fav3Temp = getNumber(data.slice(507, 509));
  const fav4Name = Buffer.from(data.slice(509, 573))
    .toString('utf8')
    .replace(/\u0000/g, '') // eslint-disable-line no-control-regex
    .trim();
  const fav4Temp = getNumber(data.slice(573, 575));
  const tempAdjustAmt = getNumber(data.slice(575, 577));
  const temp = getNumber(data.slice(577, 579));
  const setTemp = getNumber(data.slice(579, 581));
  const avgTemp = getNumber(data.slice(581, 583));
  const P = bytesToDouble(Uint8Array.from(data.slice(583, 591)));
  const I = bytesToDouble(Uint8Array.from(data.slice(591, 599)));
  const D = bytesToDouble(Uint8Array.from(data.slice(599, 607)));
  const unitType = data.slice(607, 608)[0];

  const booleanMap = [...Array(8)].map((_, i) =>
    Boolean(data.slice(608, 609)[0] & (1 << (7 - i)))
  );

  const deviceModel = data.slice(609)[0]; //TODO: move this to the front of the packed message so it can be used to determine the rest of the message

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
    deviceModel,
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
    unitType,
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
    avgTemp,
    P,
    I,
    D,
    AUTO_OFF_ENABLED,
    COIL_ENABLED,
    BUMP_ENABLED,
    LIGHTS_ENABLED,
    WIFI_ENABLED,
    SSID_SET,
    BT_ENABLED,
    ledStatus
  };
};
