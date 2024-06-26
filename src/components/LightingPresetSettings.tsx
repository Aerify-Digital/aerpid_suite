import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Divider
} from '@mui/material';
import LedMode from '../enum/LedMode';
import { useLedContext } from '../contexts/LedContext';

export default function LightingPresetSettings() {
  const led = useLedContext();
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography
              variant="h6"
              align="center"
              className="!font-medium !text-xl !bg-[#25262f35] pt-2 pb-2"
            >
              Lighting Presets
            </Typography>
          </Grid>
          <Divider className="!mb-4" />
          <Grid item container spacing={2} justifyContent="center">
            <Grid item justifyContent="center">
              <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
                <Grid container item spacing={2}>
                  <Grid item>
                    <Typography variant="overline">Preset</Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <FormControl component="fieldset">
                      <Stack direction="column">
                        <RadioGroup onChange={() => {}}>
                          <FormControlLabel
                            value={LedMode.RAINBOW_WAVE}
                            control={<Radio />}
                            label="Rainbow Wave"
                            checked={led.ledMode === LedMode.RAINBOW_WAVE}
                            onClick={() => {
                              led.setLedMode(LedMode.RAINBOW_WAVE);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.RAINBOW}
                            control={<Radio />}
                            label="Rainbow"
                            checked={led.ledMode === LedMode.RAINBOW}
                            onClick={() => {
                              led.setLedMode(LedMode.RAINBOW);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.RAINBOW_PULSE}
                            control={<Radio />}
                            label="Rainbow Pulse"
                            checked={led.ledMode === LedMode.RAINBOW_PULSE}
                            onClick={() => {
                              led.setLedMode(LedMode.RAINBOW_PULSE);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.SHIFT}
                            control={<Radio />}
                            label="Color Shift"
                            checked={led.ledMode === LedMode.SHIFT}
                            onClick={() => {
                              led.setLedMode(LedMode.SHIFT);
                            }}
                            disabled={led.status}
                          />
                          <FormControlLabel
                            value={LedMode.PULSE}
                            control={<Radio />}
                            label="Color Pulse"
                            checked={led.ledMode === LedMode.PULSE}
                            onClick={() => {
                              led.setLedMode(LedMode.PULSE);
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
                        These presets will ignore selected color and brightness,
                        instead cycling through many colors at various
                        brightness ranges.
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
    /*
    <Grid item xs={6} justifyContent="center">
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2 }}>
          <Grid item sx={{ p: 2 }}>
            <Typography variant="overline">Lighting Presets</Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Paper elevation={3} sx={{ m: 2, p: 2 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <FormControl component="fieldset">
                    <Stack direction="column">
                      <RadioGroup onChange={() => {}}>
                        <FormControlLabel
                          value={LedMode.RAINBOW_WAVE}
                          control={<Radio />}
                          label="Rainbow Wave"
                          checked={led.ledMode === LedMode.RAINBOW_WAVE}
                          onClick={() => {
                            led.setLedMode(LedMode.RAINBOW_WAVE);
                          }}
                          disabled={led.status}
                        />
                        <FormControlLabel
                          value={LedMode.RAINBOW}
                          control={<Radio />}
                          label="Rainbow"
                          checked={led.ledMode === LedMode.RAINBOW}
                          onClick={() => {
                            led.setLedMode(LedMode.RAINBOW);
                          }}
                          disabled={led.status}
                        />
                        <FormControlLabel
                          value={LedMode.RAINBOW_PULSE}
                          control={<Radio />}
                          label="Rainbow Pulse"
                          checked={led.ledMode === LedMode.RAINBOW_PULSE}
                          onClick={() => {
                            led.setLedMode(LedMode.RAINBOW_PULSE);
                          }}
                          disabled={led.status}
                        />
                        <FormControlLabel
                          value={LedMode.SHIFT}
                          control={<Radio />}
                          label="Color Shift"
                          checked={led.ledMode === LedMode.SHIFT}
                          onClick={() => {
                            led.setLedMode(LedMode.SHIFT);
                          }}
                          disabled={led.status}
                        />
                        <FormControlLabel
                          value={LedMode.PULSE}
                          control={<Radio />}
                          label="Color Pulse"
                          checked={led.ledMode === LedMode.PULSE}
                          onClick={() => {
                            led.setLedMode(LedMode.PULSE);
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
                      These presets will ignore selected color and brightness,
                      instead cycling through many colors at various brightness
                      ranges.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Box>
    </Grid>*/
  );
}
