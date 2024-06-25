import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Typography
} from '@mui/material';
import { useLedContext } from '../contexts/LedContext';

export default function LedSettings() {
  const led = useLedContext();

  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline">LED Settings</Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            <Grid item justifyContent="center">
              <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
                <Grid container item justifyContent="center" spacing={2}>
                  <Paper elevation={6} sx={{ m: 1, p: 2 }}>
                    <Grid item container xs={12} textAlign="center">
                      <Grid item textAlign="center">
                        <Typography variant="overline">
                          Main Controls
                        </Typography>
                      </Grid>
                      <Grid item container direction="row" spacing={2}>
                        <Grid item xs={6} textAlign="center">
                          <Button
                            variant="contained"
                            color={led.enabled ? 'error' : 'success'}
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => {
                              //TODO: Implement Enable/Disable logic
                            }}
                          >
                            {led.enabled ? 'Disable' : 'Enable'} LEDs
                          </Button>
                        </Grid>
                        <Grid item xs={6} textAlign="center">
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ fontWeight: 'bold' }}
                            onClick={() => {
                              //TODO: Implement Reset logic
                            }}
                          >
                            Reset LEDs
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Grid item textAlign="center">
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                            checked: boolean
                          ) => {
                            led.setStatus(checked);
                          }}
                          checked={led.status}
                        />
                      }
                      label="Status"
                    />
                  </Grid>
                  <Grid item>
                    <Box sx={{ pt: 2, pb: 2 }}>
                      <Typography variant="subtitle2">
                        For your own safety please do not look directly into any
                        of the LEDs on the AerPID as this can cause damage to
                        your eyes. The LEDs will get very bright at various
                        points of their activity so always be sure to operate
                        your AerPID in the correct orientation.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
