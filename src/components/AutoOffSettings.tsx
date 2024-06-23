import {
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  TextField
} from '@mui/material';

export default function AutoOffSettings() {
  return (
    <Grid item xs={6}>
      <Paper>
        <Typography variant="h6" textAlign="center">
          Auto-Off
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControlLabel
              control={<Switch color="primary" onChange={() => {}} />}
              label="Enabled"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Idle Length (in seconds)"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              "Auto-Off" is one of several built in safety features of your
              AerTiny Device. This feature allows helps to allieviate some worry
              while out and about that you may have left your heating element
              on.
              <br />
              <br />
              After the set amount of time of no activity, your device will turn
              off the heating element.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
