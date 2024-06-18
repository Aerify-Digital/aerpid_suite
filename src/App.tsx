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

function LocationDisplay() {
  const location = useLocation();
  console.log(
    `location.pathname:${location.pathname} location.hash:${location.hash}`
  );
  return <></>; // This component doesn't render anything
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
            <Route path="/settings" element={<Settings />} />
            <Route path="/heater" element={<Heater />} />
            <Route path="/lights" element={<Lights />} />
            <Route path="/comms" element={<Comms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </ConnectionProvider>
    </Router>
  );
}

export default App;
