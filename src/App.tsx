import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import Connect from './views/Connect';
import { ConnectionProvider } from './contexts/ConnectionContext';
import Home from './views/Home';
import Settings from './views/Settings';
import Heater from './views/Heater';
import Contact from './views/Contact';
import Lights from './views/Lights';
import Comms from './views/Comms';
import { useEffect } from 'react';
import Update from './views/Update';
import Graphs from './views/Graphs';
import Terminal from './views/Terminal';
import Logs from './views/Logs';

function LocationDisplay() {
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
        {process.env.NODE_ENV == 'development' ? <LocationDisplay /> : <></>}
        <div className="App">
          <Routes>
            <Route path="/" element={<Connect />} />
            <Route path="/home" element={<Home />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="terminal" element={<Terminal />} />
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
