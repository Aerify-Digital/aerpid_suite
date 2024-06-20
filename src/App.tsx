import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';

import { ConnectionProvider } from './contexts/ConnectionContext';

import Comms from './views/Comms';
import Connect from './views/Connect';
import Contact from './views/Contact';
import Graphs from './views/Graphs';
import Heater from './views/Heater';
import Home from './views/Home';
import Lights from './views/Lights';
import Logs from './views/Logs';
import Settings from './views/Settings';
import Update from './views/Update';
import SerialConsole from './views/SerialConsole';

function Debug() {
  const location = useLocation();
  useEffect(() => {
    console.log(`location.pathname:${location.pathname}`);
  }, [location.pathname]);
  return <></>;
}

function App() {
  return (
    <Router>
      <ConnectionProvider>
        {process.env.NODE_ENV == 'development' ? <Debug /> : <></>}
        <div className="App">
          <Routes>
            <Route path="/" element={<Connect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="terminal" element={<SerialConsole />} />
            <Route path="/logs" element={<Logs />} />
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
  );
}

export default App;
