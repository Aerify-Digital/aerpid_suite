import { Grid, Box, Paper, Typography, Slider } from '@mui/material';

export default function AmbientColorSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              Ambient Color
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center" sx={{ pl: 4, pr: 4 }}>
              <Typography variant="overline">Color</Typography>
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  The color you set here will be overridden if you decide to use
                  one of the Ambient Lighting Patterns. It will return though if
                  you turn off the pattern at any point.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center" sx={{ pl: 4, pr: 4 }}>
              <Typography variant="overline">Brightness</Typography>
              <Slider
                defaultValue={50}
                aria-labelledby="brightness-slider"
                valueLabelDisplay="auto"
                step={1}
                marks={[
                  { value: 0, label: '0%' },
                  { value: 100, label: '100%' }
                ]}
                min={0}
                max={100}
                onChange={() => {}}
              />
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  The brightness you set here will be overridden if you decide
                  to use one of the Ambient Lighting Patterns. It will return
                  though if you turn off the pattern at any point.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
