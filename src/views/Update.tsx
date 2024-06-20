import { useEffect, useState } from 'react';
import DeviceModel from '../enum/DeviceModel';
import { Grid, Typography } from '@mui/material';

export default function Update() {
  const [modelName, setModelName] = useState('' as string | undefined);
  useEffect(() => {
    const state = (window as any).pidState.data();
    if (state.MODEL !== undefined) {
      switch (state.MODEL) {
        case DeviceModel.AerPIDv3:
          setModelName('AerPID v3');
          break;
        case DeviceModel.AerPIDv3HP:
          setModelName('AerPID v3 HP');
          break;
        default:
          setModelName(undefined);
          break;
      }
    }
  }, []);
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left" style={{ color: '#f8f8f2' }}>
            Update Firmware
            {modelName && modelName.length > 0 ? ` for ${modelName}` : ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
