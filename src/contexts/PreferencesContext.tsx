import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

export type ContextualPreferences = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  checkForUpdates: boolean;
  setCheckForUpdates: (checkForUpdates: boolean) => void;
  checkFirmwareOnConnect: boolean;
  setCheckFirmwareOnConnect: (checkFirmwareOnConnect: boolean) => void;
};

export const PreferencesContext = createContext<
  ContextualPreferences | undefined
>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark');
  const [checkForUpdates, setCheckForUpdatesState] = useState(true);
  const [checkFirmwareOnConnect, setCheckFirmwareOnConnectState] =
    useState(true);

  useEffect(() => {
    const loadPreferences = async () => {
      const store = (window as any).electronStore;
      const storedTheme = await store.get('theme');
      const storedCheckForUpdates = await store.get('checkForUpdates');
      const storedCheckFirmwareOnConnect = await store.get(
        'checkFirmwareOnConnect'
      );

      if (storedTheme) setThemeState(storedTheme);
      if (storedCheckForUpdates !== undefined)
        setCheckForUpdatesState(storedCheckForUpdates);
      if (storedCheckFirmwareOnConnect !== undefined)
        setCheckFirmwareOnConnectState(storedCheckFirmwareOnConnect);
    };

    loadPreferences();
  }, []);
  // Update theme in Electron store
  const setTheme = async (theme: 'dark' | 'light') => {
    const store = (window as any).electronStore;
    await store.set('theme', theme);
    setThemeState(theme);
  };

  // Update checkForUpdates in Electron store
  const setCheckForUpdates = async (checkForUpdates: boolean) => {
    const store = (window as any).electronStore;
    await store.set('checkForUpdates', checkForUpdates);
    setCheckForUpdatesState(checkForUpdates);
  };

  // Update checkFirmwareOnConnect in Electron store
  const setCheckFirmwareOnConnect = async (checkFirmwareOnConnect: boolean) => {
    const store = (window as any).electronStore;
    await store.set('checkFirmwareOnConnect', checkFirmwareOnConnect);
    setCheckFirmwareOnConnectState(checkFirmwareOnConnect);
  };

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        setTheme,
        checkForUpdates,
        setCheckForUpdates,
        checkFirmwareOnConnect,
        setCheckFirmwareOnConnect
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
