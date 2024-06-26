import { Grid } from '@mui/material';
import WiFiNetworkSettings from './WiFiNetworkSettings';
import WiFiServicesSettings from './WiFiServicesSettings';

export default function NetworkConfiguration() {
  return (
    <Grid container direction="column" item sx={{ ml: 1 }}>
      <Grid item alignContent="center" container>
        <WiFiNetworkSettings />
        <WiFiServicesSettings />
      </Grid>
    </Grid>
  );
}
