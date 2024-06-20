import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import Console from '../components/Console';
import { Grid, Typography } from '@mui/material';

export default function SerialConsole() {
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
          <Typography variant="h5" align="left">
            Serial Console
          </Typography>
        </Grid>
        <Console output={connection.serialConsole.join('\n')} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
