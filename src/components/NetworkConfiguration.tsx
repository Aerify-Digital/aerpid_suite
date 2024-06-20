import { Grid, Paper, Typography } from '@mui/material';

export default function NetworkConfiguration() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center" container>
        <Grid item sx={{ mt: 3 }}>
          <Paper>
            <Typography variant="h6" align="center">
              Wifi Networks
            </Typography>
          </Paper>
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <Paper>
            <Typography variant="h6" align="center">
              Wifi Services
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
