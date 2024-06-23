import { Box, Grid, Paper, Typography } from '@mui/material';

export default function FavoriteSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="h6" textAlign="center">
              Favorites
            </Typography>
          </Grid>
          <Grid item container direction="column" spacing={2}></Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
