import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material';
import LedMode from '../enum/LedMode';
import { useLedContext } from '../contexts/LedContext';

export default function AmbientPatternSettings() {
  const led = useLedContext();
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline">Ambient Patterns</Typography>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            <Grid item justifyContent="center">
              <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
                <Grid container item justifyContent="center" spacing={2}>
                  <Grid item xs={12} textAlign="center">
                    <FormControl component="fieldset">
                      <Stack direction="column">
                        <RadioGroup onChange={() => {}}>
                          <FormControlLabel
                            value={LedMode.BLINK}
                            control={<Radio />}
                            label="Color Blink"
                            checked={led.ledMode === LedMode.BLINK}
                            onClick={() => {
                              led.setLedMode(LedMode.BLINK);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.PULSE}
                            control={<Radio />}
                            label="Color Pulse"
                            checked={led.ledMode === LedMode.PREPULSE}
                            onClick={() => {
                              led.setLedMode(LedMode.PREPULSE);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.STATIC}
                            control={<Radio />}
                            label="Static Color"
                            checked={led.ledMode === LedMode.STATIC}
                            onClick={() => {
                              led.setLedMode(LedMode.STATIC);
                            }}
                            disabled={led.status}
                          />
                        </RadioGroup>
                      </Stack>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Box sx={{ pt: 2, pb: 2 }}>
                      <Typography variant="subtitle2">
                        Ambient Patterns use the selected color, however they
                        will override the configured brightness. These patterns
                        are only active if you have selected the 'Ambient'
                        option above.
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
