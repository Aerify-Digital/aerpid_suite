import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Typography
} from '@mui/material';
import { usePreferences } from '../contexts/PreferencesContext';

export default function Preferences() {
  const preferences = usePreferences();
  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    preferences.setTheme(value as 'dark' | 'light');
  };

  const handleUpdateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    preferences.setCheckForUpdates(checked);
  };
  const handleFirmwareChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    preferences.setCheckFirmwareOnConnect(checked);
  };

  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left">
            Preferences
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          spacing={2}
          sx={{ mt: 2, pl: 2 }}
        >
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Theme</FormLabel>
              <RadioGroup
                row
                aria-label="theme-mode"
                name="theme-mode"
                value={preferences.theme}
                onChange={handleThemeChange}
              >
                <FormControlLabel
                  value="light"
                  control={<Radio checked={preferences.theme === 'light'} />}
                  label="Light Mode"
                />
                <FormControlLabel
                  value="dark"
                  control={<Radio checked={preferences.theme === 'dark'} />}
                  label="Dark Mode"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.checkForUpdates}
                  onChange={handleUpdateChange}
                />
              }
              label="Check for Updates"
            />
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={preferences.checkFirmwareOnConnect}
                  onChange={handleFirmwareChange}
                />
              }
              label="Firmware Check on Connect"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
