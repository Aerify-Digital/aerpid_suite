import { Grid, Typography } from '@mui/material';
import ConnectForm from '../components/ConnectForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';

export default function Connect() {
  const [version, setVersion] = useState<string>('');
  const connection = useConnectionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development ') {
      console.log(connection.connected ? 'Connected' : 'Not connected');
    }
    if (connection.connected) navigate('/home');
    const api = (window as any).electronAPI;
    api
      .getAppVersion()
      .then((version: string) => {
        setVersion(`v${version}`);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, [connection.connected]);
  return (
    <Grid container direction="column" justifyContent="center" spacing={1}>
      <Grid item sx={{ mt: 2, mb: 1 }}>
        <Typography variant="h3" align="center">
          AerPID Suite
        </Typography>
        <Typography variant="subtitle2" align="center">
          {version}
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
