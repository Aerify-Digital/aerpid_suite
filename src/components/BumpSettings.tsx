import { Grid, Paper, Typography, TextField } from '@mui/material';

export default function BumpSettings() {
  return (
    <Grid item xs={6}>
      <Paper>
        <Typography variant="h6" textAlign="center">
          Bump
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField label="Bump Amount" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <TextField label="Bump Length" variant="outlined" fullWidth />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              "Bump" is a feature that temporarily increases the operating
              temperature of your AerTiny device: often used to clean the
              heating element.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
