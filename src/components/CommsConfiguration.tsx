import { Grid, Paper, Switch, Typography } from '@mui/material';

export default function CommsConfiguration() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center" container>
        <Grid item xs={6} sx={{ mt: 3 }}>
          <Paper>
            <Typography variant="h6" align="center">
              USB Communication
            </Typography>
            <Grid container direction="row" justifyContent="center" spacing={1}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                spacing={1}
              >
                <Grid item container justifyContent="center">
                  <Grid item>
                    <Typography variant="subtitle1" align="center">
                      Enabled
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Switch
                      checked={true}
                      onChange={() => console.log('switched')}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" align="center">
                    The AerPID Control Suite allows you to control and debug
                    your AerPID Device from your PC when connected over the USB
                    serial connection.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{ mt: 3 }}></Grid>
      </Grid>
    </Grid>
  );
}
