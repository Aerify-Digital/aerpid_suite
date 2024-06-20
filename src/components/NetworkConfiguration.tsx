import { Grid, Paper, Typography } from '@mui/material';

export default function NetworkConfiguration() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center" container>
        <Grid item sx={{ mt: 3 }}>
          <Paper
            style={{
              backgroundColor: '#44475a'
            }}
          >
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#f8f8f2' }}
            >
              Wifi Networks
            </Typography>
          </Paper>
        </Grid>
        <Grid item sx={{ mt: 3 }}>
          <Paper
            style={{
              backgroundColor: '#44475a'
            }}
          >
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#f8f8f2' }}
            >
              Wifi Services
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
