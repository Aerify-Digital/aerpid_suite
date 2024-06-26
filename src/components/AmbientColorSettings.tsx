import { Grid, Box, Paper, Typography, Slider, Divider } from '@mui/material';

export default function AmbientColorSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 3, pl: 2, pr: 2 }}>
          <Typography
            variant="h6"
            align="center"
            className="!font-medium !text-xl !bg-[#25262f35] pt-2 pb-2"
          >
            Ambient Color
          </Typography>
          <Divider className="!mb-4 !mt-4" />
          <Grid item container spacing={2} justifyContent="center">
            <Grid item justifyContent="center">
              <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
                <Grid container item justifyContent="center" spacing={2}>
                  <Grid item container>
                    <Grid item>
                      <Typography variant="overline">Color</Typography>
                    </Grid>
                    <Grid item>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2">
                          The color you set here will be be used as the Ambient
                          Lighting Color when the Ambient Lighting Pattern is
                          set.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item justifyContent="center">
              <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
                <Grid container item justifyContent="center" spacing={2}>
                  <Grid item container>
                    <Grid item>
                      <Typography variant="overline">Brightness</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 4 }}>
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
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2">
                          The color you set here will be be used as the Ambient
                          Lighting Color when the Ambient Lighting Pattern is
                          set.
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
    /*
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              Ambient Color
            </Typography>
          </Grid>

          <Grid item container direction="column" spacing={2}>
            <Paper elevation={3} sx={{ m: 2, p: 2 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item container>
                  <Grid item>
                    <Typography variant="overline">Color</Typography>
                  </Grid>
                  <Grid item>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2">
                        The color you set here will be be used as the Ambient
                        Lighting Color when the Ambient Lighting Pattern is set.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} sx={{ m: 2, p: 2 }}>
              <Grid item container textAlign="center">
                <Grid item>
                  <Typography variant="overline">Brightness</Typography>
                </Grid>
                <Grid item xs={12}>
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
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2">
                      The brightness you set here will be overridden if you
                      decide to use one of the Ambient Lighting Patterns. It
                      will return though if you turn off the pattern at any
                      point.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Box>
    </Grid>
    /*
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
            <Grid item container textAlign="center" sx={{ pl: 4, pr: 4 }}>
              <Grid item xs={12}>
                <Typography variant="overline">Brightness</Typography>
              </Grid>
             
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
    </Grid>*/
  );
}
