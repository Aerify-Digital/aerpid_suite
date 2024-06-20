import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

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
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left">
            Heater
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
