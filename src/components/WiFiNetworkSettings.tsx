import { PermScanWifi } from '@mui/icons-material';
import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  MenuItem,
  Select,
  Button,
  Checkbox
} from '@mui/material';
import { useState } from 'react';

export default function WiFiNetworkSettings() {
  const [scanning, setScanning] = useState(false);
  const [nearbyNetworks, setNearbyNetworks] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const doScan = async () => {
    // Implement WiFi scan logic
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setShowPassword(checked);
  };
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="overline" textAlign="center">
              WiFi Network
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <Select
                fullWidth
                defaultValue="none"
                value="none"
                onChange={() => {}}
                dir="down"
              >
                <MenuItem key={`ssid_none`} value="none" disabled>
                  Scan First
                </MenuItem>
              </Select>
            </Grid>
            <Grid item textAlign="center">
              <Button
                startIcon={<PermScanWifi />}
                variant="contained"
                onClick={doScan}
                disabled={scanning}
              >
                Scan
              </Button>
            </Grid>
            <Grid item textAlign="center">
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
              />
            </Grid>
            <Grid item textAlign="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Show Password"
              />
            </Grid>
            <Grid item textAlign="center">
              <Typography variant="subtitle2">
                Leave the Password field blank for open networks.
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={6} textAlign="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => {
                    /* Implement Reboot AerPID logic */
                  }}
                >
                  Connect
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ fontWeight: 'bold' }}
                  onClick={() => {
                    /* Implement Factory Reset logic */
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
