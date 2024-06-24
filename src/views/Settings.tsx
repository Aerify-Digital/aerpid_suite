import { useEffect } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import FavoriteTempSettings from '../components/FavoriteSettings';
import DeviceSettings from '../components/DeviceSettings';

export default function Settings() {
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
        <Grid item direction="row">
          <Grid item sx={{ mt: 3, ml: 2 }}>
            <Typography variant="h5">Settings</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing="2">
          <FavoriteTempSettings />
          <DeviceSettings />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}
