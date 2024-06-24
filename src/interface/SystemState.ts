import RGBColor from '../type/RGBColor';
import LedMode from '../enum/LedMode';

export default interface SystemState {
  INITIALIZED: boolean;
  MODEL: number;
  VERSION: string;
  NET_VERSION: string;
  HOSTNAME: string;
  UPTIME: number;
  TEMP: number;
  SET_TEMP: number;
  AVG_TEMP: number;
  BUMP: {
    enabled: boolean;
    length: number;
    amount: number;
  };
  COIL: {
    enabled: boolean;
    P: number;
    I: number;
    D: number;
  };
  LED: {
    enabled: boolean;
    mode: LedMode;
    color: RGBColor;
    brightness: number;
    status: boolean;
  };
  FAV_1: {
    name: string;
    temp: number;
  };
  FAV_2: {
    name: string;
    temp: number;
  };
  FAV_3: {
    name: string;
    temp: number;
  };
  FAV_4: {
    name: string;
    temp: number;
  };
}
