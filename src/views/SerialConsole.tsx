import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import Console from '../components/Console';
import { Box, Grid, Typography } from '@mui/material';

export default function SerialConsole() {
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
            <Typography variant="h5">Serial Console</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Console output={connection.serialConsole.join('\n')} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}
