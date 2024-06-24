import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import NetworkConfiguration from '../components/NetworkConfiguration';
import ComunicationsConfiguration from '../components/ComunicationsConfiguration';

export default function Communications() {
  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);
  return connection.connected ? (
    <Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
      <Grid container direction="column" item>
        <Grid item container direction="row">
          <Grid item sx={{ mt: 3, ml: 2 }}>
            <Typography variant="h5">Communications Settings</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid container direction="column" item>
            <Grid item alignContent="center">
              <NetworkConfiguration />
            </Grid>
            <Grid item alignContent="center">
              <ComunicationsConfiguration />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}
