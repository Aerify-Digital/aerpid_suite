import { Box, Grid, Paper, TextField, Typography } from '@mui/material';
import Favorite from './Favorite';

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
          <Grid item container direction="column" spacing={2}>
            <Favorite favNum={1} />
            <Favorite favNum={2} />
            <Favorite favNum={3} />
            <Favorite favNum={4} />
            <Grid item>
              <Typography variant="subtitle2">
                These settings will be applied automatically once you have
                finished changing them.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
