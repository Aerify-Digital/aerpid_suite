import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import NetworkConfiguration from '../components/NetworkConfiguration';
import CommsConfiguration from '../components/CommsConfiguration';

export default function Comms() {
  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);
  return connection.connected ? (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left" style={{ color: '#f8f8f2' }}>
            Network Configuration
          </Typography>
          <NetworkConfiguration />
        </Grid>
      </Grid>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left" style={{ color: '#f8f8f2' }}>
            Comms Configuration
          </Typography>
          <CommsConfiguration />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
