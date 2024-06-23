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
    <Grid container direction="column" item>
      <Grid item direction="row">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Box sx={{ zIndex: 1000, p: 2 }}>
            <Typography variant="h5">Heater Settings</Typography>
          </Box>
        </Grid>
        <Grid item container direction="row">
          <PidSettings />
        </Grid>
        <Grid item container direction="row" spacing={2} sx={{ pl: 2, pr: 2 }}>
          <BumpSettings />
          <AutoOffSettings />
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
