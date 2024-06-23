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
      <Grid item direction="row">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5">Communications Settings</Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row">
        <Grid container direction="column" item>
          <Grid item alignContent="center">
            <Grid item sx={{ mt: 3, ml: 2 }}>
              <Typography variant="h5" align="left">
                Network Configuration
              </Typography>
              <NetworkConfiguration />
            </Grid>
          </Grid>
          <Grid item alignContent="center">
            <Grid item sx={{ mt: 3, ml: 2 }}>
              <Typography variant="h5" align="left">
                USB Configuration
              </Typography>
              <CommsConfiguration />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
