import { PermScanWifi } from '@mui/icons-material';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch
} from '@mui/material';

export default function UsbCommunicationSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              USB Communications
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <FormControlLabel
                control={<Switch color="primary" onChange={() => {}} />}
                label="Enabled"
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                The AerPID Control Suite allows you to control and debug your
                AerPID Device from your PC when connected over the USB serial
                connection.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
