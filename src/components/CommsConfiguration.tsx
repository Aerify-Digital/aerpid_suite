import { CheckBox } from '@mui/icons-material';
import { Grid, Paper, Switch, ToggleButton, Typography } from '@mui/material';

export default function CommsConfiguration() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center" container>
        <Grid item xs={6} sx={{ mt: 3 }}>
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
                    <Typography
                      variant="subtitle1"
                      align="center"
                      style={{ color: '#f8f8f2' }}
                    >
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
                  <Typography
                    variant="subtitle1"
                    align="center"
                    style={{ color: '#f8f8f2' }}
                  >
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
