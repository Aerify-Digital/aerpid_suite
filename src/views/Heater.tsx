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
    <Grid item container>
      <Grid item sx={{ pt: 1, pb: 1, pl: 2 }} direction="row">
        <Typography variant="h5">Heater Settings</Typography>
      </Grid>
      <Grid item container direction="row">
        <PidSettings />
      </Grid>
      <Grid item container direction="row">
        <BumpSettings />
        <AutoOffSettings />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
