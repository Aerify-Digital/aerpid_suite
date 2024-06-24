import { ReactNode, createContext, useState } from 'react';
import LedMode from '../enum/LedMode';
import { RGBColor } from '../interface/SystemState';

export type ContextualizedLed = {
  ledMode: LedMode;
  setLedMode: (ledMode: LedMode) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  color: RGBColor;
  setColor: (color: RGBColor) => void;
};

export const LedContext = createContext<ContextualizedLed | undefined>(
  undefined
);

export function LedProvider({ children }: { children: ReactNode }) {
  const [ledMode, setLedMode] = useState(LedMode.STATIC);
  const [brightness, setBrightness] = useState(0);
  const [color, setColor] = useState([0, 0, 0] as RGBColor);

  return (
    <LedContext.Provider
      value={{
        ledMode,
        setLedMode,
        brightness,
        setBrightness,
        color,
        setColor
      }}
    >
      {children}
    </LedContext.Provider>
  );
}
