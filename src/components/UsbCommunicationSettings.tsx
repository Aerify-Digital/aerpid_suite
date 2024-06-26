import { PermScanWifi } from '@mui/icons-material';
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';

export default function UsbCommunicationSettings() {
  return (
    <Grid item className="!w-full">
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography
              variant="h6"
              align="center"
              className="!font-medium !text-xl !bg-[#25262f35] pt-2 pb-2"
            >
              USB Communication
            </Typography>
          </Grid>
          <Divider className="!mb-4" />
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <FormControlLabel
                control={
                  <Switch color="primary" onChange={() => {}} checked={true} />
                }
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
