import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography
} from '@mui/material';

export default function LedSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="h6" textAlign="center">
              LED Settings
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <Typography variant="overline">Main Controls</Typography>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={6} textAlign="center">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => {
                    /* Implement Reboot AerPID logic */
                  }}
                >
                  Disable LEDs
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => {
                    /* Implement Factory Reset logic */
                  }}
                >
                  Reset LEDs
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item direction="column" textAlign="center">
            <FormControlLabel
              control={<Switch color="primary" onChange={() => {}} />}
              label="Status"
            />
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  For your own safety please do not look directly into any of
                  the LEDs on the AerPID as this can cause damage to your eyes.
                  The LEDs will get very bright at various points of their
                  activity so always be sure to operate your AerPID in the
                  correct orientation.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
