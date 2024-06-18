import { Grid, Typography } from '@mui/material';
import ConnectForm from '../components/ConnectForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';

export default function Connect() {
  const connection = useConnectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`connection changed`);
    if (connection.connected) navigate('/home');
    else navigate('/');
  }, [connection.connected]);
  return (
    <Grid container direction="column" justifyContent="center" spacing={1}>
      <Grid item sx={{ mt: 2, mb: 1 }}>
        <Typography variant="h3" align="center">
          AerPID Suite
        </Typography>
      </Grid>
      <Grid item sx={{ mt: 0, mb: 1 }}>
        <Typography variant="subtitle1" align="center">
          by Aerify Digital
        </Typography>
      </Grid>
      <Grid item>
        <ConnectForm />
      </Grid>
    </Grid>
  );
}
