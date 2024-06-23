import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ConnectionProvider } from './contexts/ConnectionContext';

import Comms from './views/Comms';
import Connect from './views/Connect';
import Contact from './views/Contact';
import Graphs from './views/Graphs';
import Heater from './views/Heater';
import Home from './views/Home';
import Lights from './views/Lights';
import Settings from './views/Settings';
import Update from './views/Update';
import SerialConsole from './views/SerialConsole';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Preferences from './views/Preferences';
import {
  PreferencesProvider,
  usePreferences
} from './contexts/PreferencesContext';

function Debug() {
  const location = useLocation();
  useEffect(() => {
    console.log(`location.pathname:${location.pathname}`);
  }, [location.pathname]);
  return <></>;
}

function AppContent() {
  const preferences = usePreferences();
  const [curTheme, setCurTheme] = useState(theme(preferences.theme));
  useEffect(() => {
    setCurTheme(theme(preferences.theme));
  }, [preferences.theme]);
  return (
    <ThemeProvider theme={curTheme}>
      <CssBaseline />
      <Router>
        <ConnectionProvider>
          {process.env.NODE_ENV == 'development' ? <Debug /> : <></>}
          <div className="App">
            <Routes>
              <Route path="/" element={<Connect />} />
              <Route path="/home" element={<Home />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/graphs" element={<Graphs />} />
              <Route path="/console" element={<SerialConsole />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/heater" element={<Heater />} />
              <Route path="/lights" element={<Lights />} />
              <Route path="/comms" element={<Comms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/update" element={<Update />} />
            </Routes>
          </div>
        </ConnectionProvider>
      </Router>
    </ThemeProvider>
  );
}

function App() {
  return (
    <PreferencesProvider>
      <AppContent />
    </PreferencesProvider>
  );
}

export default App;
