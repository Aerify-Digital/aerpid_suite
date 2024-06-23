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

export default function AmbientPatternSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="h6" textAlign="center">
              Ambient Patterns
            </Typography>
          </Grid>

          <Grid item container direction="column" spacing={2}>
            <Grid item direction="column" textAlign="center">
              <FormControl component="fieldset">
                <Stack direction="column">
                  <RadioGroup onChange={() => {}}>
                    <FormControlLabel
                      value={LedMode.BLINK}
                      control={<Radio />}
                      label="Color Blink"
                    />
                    <FormControlLabel
                      value={LedMode.PULSE}
                      control={<Radio />}
                      label="Color Pulse"
                    />
                    <FormControlLabel
                      value={LedMode.STATIC}
                      control={<Radio />}
                      label="Static Color"
                    />
                  </RadioGroup>
                </Stack>
              </FormControl>
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  Ambient Patterns use the selected color, however they will
                  override the configured brightness. These patterns are only
                  active if you have selected the 'Ambient' option above.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
