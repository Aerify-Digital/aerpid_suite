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
            <Typography variant="h6" textAlign="center">
              Device Settings
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <TextField
                label="Host Name"
                variant="outlined"
                value="AERPID-B9A474"
              />
            </Grid>
            <Grid item textAlign="center">
              <TextField
                label="System Version"
                variant="outlined"
                value="3.2.4"
              />
            </Grid>
            <Grid item textAlign="center">
              <TextField
                label="System Uptime"
                variant="outlined"
                value="12282720"
              />
            </Grid>
            <Grid item textAlign="center">
              <FormControl component="fieldset">
                <FormLabel component="legend">Adjustment Amount</FormLabel>
                <RadioGroup
                  row
                  aria-label="amount"
                  name="row-radio-buttons-group"
                  value="1"
                  onChange={() => {}}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="5" control={<Radio />} label="5" />
                  <FormControlLabel value="10" control={<Radio />} label="10" />
                  <FormControlLabel value="20" control={<Radio />} label="20" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item container xs={12}>
              <Grid item>
                <Typography variant="body1">Advanced Options</Typography>
              </Grid>
              <Grid item container>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      /* Implement Reboot AerPID logic */
                    }}
                  >
                    Reboot AerPID
                  </Button>{' '}
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      /* Implement Factory Reset logic */
                    }}
                  >
                    Factory Reset
                  </Button>
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <FormControlLabel
                    control={<Switch color="primary" onChange={() => {}} />}
                    label="Debug Mode"
                  />
                </Grid>
              </Grid>
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
