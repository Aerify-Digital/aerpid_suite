import { useEffect } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

export default function Settings() {
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
            Settings
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
