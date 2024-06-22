import { Grid, Typography } from '@mui/material';

export default function Preferences() {
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left">
            Preferences
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
