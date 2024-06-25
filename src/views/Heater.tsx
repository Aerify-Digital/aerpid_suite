import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { Box, Grid, Typography } from '@mui/material';
import PidSettings from '../components/PidSettings';
import BumpSettings from '../components/BumpSettings';
import AutoOffSettings from '../components/AutoOffSettings';

export default function Heater() {
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
        <Grid item>
          <Grid item sx={{ mt: 3, ml: 2 }}>
            <Typography variant="h5">Heater Settings</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing="2">
          <Grid item container direction="row">
            <PidSettings />
          </Grid>
          <Grid item container direction="row">
            <BumpSettings />
            <AutoOffSettings />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}
