import { useEffect, useState } from 'react';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import DeviceModel from '../enum/DeviceModel';

export default function Home() {
  const [hostName, setHostName] = useState('' as string | undefined);
  const getDeviceModel = (model: DeviceModel) => {
    switch (model) {
      case DeviceModel.AerPIDv3:
        return 'AerPID v3';
      case DeviceModel.AerPIDv3HP:
        return 'AerPID v3 HP';
      default:
        return '';
    }
  };
  const [modelName, setModelName] = useState('' as string | undefined);

  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    } else if (connection.connected && connection.initialized) {
      const state = (window as any).pidState.data();
      setHostName(state.HOSTNAME);
      setModelName(getDeviceModel(state.MODEL));
    }
  }, [connection.connected, connection.initialized]);
  return connection.connected ? (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left" style={{ color: '#f8f8f2' }}>
            {hostName &&
            modelName &&
            hostName.length > 0 &&
            modelName.length > 0
              ? `${hostName} (${modelName})`
              : ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
