import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import ExternalLink from './ExternalLink';

export default function DeviceSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              Device Settings
            </Typography>
          </Grid>
          <Grid item justifyContent="center">
            <Paper elevation={3} sx={{ m: 1, p: 2 }}>
              <Grid item container spacing={2} justifyContent="center">
                <Grid item textAlign="center">
                  <TextField
                    label="Host Name"
                    variant="outlined"
                    value="AERPID-B9A474"
                  />
                </Grid>
                <Grid item textAlign="center">
                  <TextField
                    label="Firmware Version"
                    variant="outlined"
                    value="3.2.4"
                  />
                </Grid>
                <Grid item textAlign="center">
                  <TextField
                    label="Web Version"
                    variant="outlined"
                    value="0.3.74"
                  />
                </Grid>
                <Grid item textAlign="center">
                  <TextField
                    label="System Uptime"
                    variant="outlined"
                    value="12282720"
                  />
                </Grid>
              </Grid>
            </Paper>

            <Grid item textAlign="center">
              <Paper elevation={3} sx={{ m: 1, p: 1 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Adjustment Amount</FormLabel>
                  <RadioGroup
                    row
                    aria-label="amount"
                    name="row-radio-buttons-group"
                    value="1"
                    onChange={() => {}}
                  >
                    <FormControlLabel
                      value="0.1"
                      control={<Radio />}
                      label="0.1"
                    />
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel
                      value="10"
                      control={<Radio />}
                      label="10"
                    />
                  </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12} justifyContent="center">
              <Paper elevation={3} sx={{ m: 1, p: 2 }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="body1">Advanced Options</Typography>
                  </Grid>
                  <Grid item container spacing={2} justifyContent="center">
                    <Grid item xs={6} textAlign="center">
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => {
                          /* Implement Reboot AerPID logic */
                        }}
                      >
                        Reboot AerPID
                      </Button>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => {
                          /* Implement Factory Reset logic */
                        }}
                      >
                        Factory Reset
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <FormControlLabel
                      control={<Switch color="primary" onChange={() => {}} />}
                      label="Debug Mode"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Make sure to keep up with our latest updates and news on{' '}
                {
                  <ExternalLink url="https://aerify.digital">
                    our website
                  </ExternalLink>
                }
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
