import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Box
} from '@mui/material';

export default function AutoOffSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="h6" textAlign="center">
              Auto-Off
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <FormControlLabel
                control={<Switch color="primary" onChange={() => {}} />}
                label="Enabled"
              />
            </Grid>
            <Grid item textAlign="center">
              <TextField label="Timeout (seconds)" variant="outlined" />
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  "Auto-Off" is one of several built in safety features of your
                  AerTiny Device. This feature allows helps to allieviate some
                  worry while out and about that you may have left your heating
                  element on.
                  <br />
                  <br />
                  After the set amount of time of no activity, your device will
                  turn off the heating element.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
