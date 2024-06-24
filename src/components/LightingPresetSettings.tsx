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

export default function LightingPresetSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              Lighting Presets
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item direction="column" textAlign="center">
              <FormControl component="fieldset">
                <Stack direction="column">
                  <RadioGroup onChange={() => {}}>
                    <FormControlLabel
                      value={LedMode.RAINBOW_WAVE}
                      control={<Radio />}
                      label="Rainbow Wave"
                    />
                    <FormControlLabel
                      value={LedMode.RAINBOW}
                      control={<Radio />}
                      label="Rainbow"
                    />
                    <FormControlLabel
                      value={LedMode.RAINBOW_PULSE}
                      control={<Radio />}
                      label="Rainbow Pulse"
                    />
                    <FormControlLabel
                      value={LedMode.SHIFT}
                      control={<Radio />}
                      label="Color Shift"
                    />
                    <FormControlLabel
                      value={LedMode.PULSE}
                      control={<Radio />}
                      label="Color Pulse"
                    />
                  </RadioGroup>
                </Stack>
              </FormControl>
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  These presets will ignore selected color and brightness,
                  instead cycling through many colors at various brightness
                  ranges.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
