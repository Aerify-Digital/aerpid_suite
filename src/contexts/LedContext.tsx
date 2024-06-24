import { ReactNode, createContext, useContext, useState } from 'react';
import LedMode from '../enum/LedMode';
import RGBColor from '../type/RGBColor';

export type ContextualizedLed = {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  ledMode: LedMode;
  setLedMode: (ledMode: LedMode) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  status: boolean;
  setStatus: (status: boolean) => void;
  color: RGBColor;
  setColor: (color: RGBColor) => void;
};

export const LedContext = createContext<ContextualizedLed | undefined>(
  undefined
);

export function LedProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ledMode, setLedMode] = useState(LedMode.STATIC);
  const [brightness, setBrightness] = useState(0);
  const [color, setColor] = useState([0, 0, 0] as RGBColor);
  const [status, setStatus] = useState(false);

  return (
    <LedContext.Provider
      value={{
        enabled,
        setEnabled,
        ledMode,
        setLedMode,
        brightness,
        setBrightness,
        status,
        setStatus,
        color,
        setColor
      }}
    >
      {children}
    </LedContext.Provider>
  );
}

export const useLedContext = () => {
  const context = useContext(LedContext);
  if (context === undefined) {
    throw new Error('useLedContext must be used within a LedProvider');
  }
  return context;
};
