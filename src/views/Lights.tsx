import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LedSettings from '../components/LedSettings';
import LightingPresetSettings from '../components/LightingPresetSettings';
import AmbientColorSettings from '../components/AmbientColorSettings';
import AmbientPatternSettings from '../components/AmbientPatternSettings';
import { LedProvider } from '../contexts/LedContext';

export default function Lights() {
  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);
  return connection.connected ? (
    <LedProvider>
      <Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <Grid container direction="column" item>
          <Grid item>
            <Grid item sx={{ mt: 3, ml: 2 }}>
              <Typography variant="h5">Light Settings</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing="2">
            <Grid item container direction="row">
              <LedSettings />
              <AmbientPatternSettings />
            </Grid>
            <Grid item container direction="row">
              <LightingPresetSettings />
              <AmbientColorSettings />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/*<Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
        <Grid item container>
          <Grid item sx={{ p: 2 }} direction="row" xs={12}>
            <Typography variant="h5">Light Settings</Typography>
          </Grid>

          <Grid item container>
            <Grid item container direction="row">
              <LedSettings />
              <AmbientPatternSettings />
            </Grid>
            <Grid item container direction="row">
              <LightingPresetSettings />
              <AmbientColorSettings />
            </Grid>
          </Grid>
        </Grid>
      </Box>*/}
    </LedProvider>
  ) : (
    <></>
  );
}
