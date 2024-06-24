import { Grid } from '@mui/material';
import UsbCommunicationSettings from './UsbCommunicationSettings';

export default function CommunicationsConfiguration() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center" container>
        <UsbCommunicationSettings />
        <Grid item xs={6}></Grid>
      </Grid>
    </Grid>
  );
}
