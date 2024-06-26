import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  TextField,
  Divider
} from '@mui/material';

export default function WiFiServicesSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography
              variant="h6"
              align="center"
              className="!font-medium !text-xl !bg-[#25262f35] pt-2 pb-2"
            >
              Wifi Services
            </Typography>
          </Grid>
          <Divider className="!mb-4" />
          <Grid item container direction="column">
            <Grid item textAlign="center" className="!mb-[1.2rem]">
              <FormControlLabel
                control={<Switch color="primary" onChange={() => {}} />}
                label="Enabled"
              />
            </Grid>
            <Grid item textAlign="center" className="!mb-[1.2rem]">
              <TextField label="SSID" variant="outlined" value="Some SSID" />
            </Grid>
            <Grid item textAlign="center" className="!mb-[1.2rem]">
              <TextField
                label="IP Address"
                variant="outlined"
                value="127.0.0.1"
              />
            </Grid>
            <Grid item textAlign="center" className="!mb-[1.2rem]">
              <TextField
                label="Subnet Mask"
                variant="outlined"
                value="255.255.255.0"
              />
            </Grid>
            <Grid item textAlign="center">
              <TextField
                label="Web Version"
                variant="outlined"
                value="0.3.74"
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
