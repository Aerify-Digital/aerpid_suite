import { RGBColor } from './SystemState';

export default interface InitData {
  ver: string;
  verNet: string;
  ipAddr: string;
  ssid: string;
  hostname: string;
  uptime: number;
  bumpTemp: number;
  bumpTime: number;
  autoOffTime: number;
  ledMode: number;
  ledColor: RGBColor;
  ledBrightness: number;
  fav1Name: string;
  fav1Temp: number;
  fav2Name: string;
  fav2Temp: number;
  fav3Name: string;
  fav3Temp: number;
  fav4Name: string;
  fav4Temp: number;
  tempAdjustAmt: number;
  temp: number;
  setTemp: number;
  P: number;
  I: number;
  D: number;
  AUTO_OFF_ENABLED: boolean;
  COIL_ENABLED: boolean;
  BUMP_ENABLED: boolean;
  LIGHTS_ENABLED: boolean;
  WIFI_ENABLED: boolean;
  SSID_SET: boolean;
  BT_ENABLED: boolean;
}
