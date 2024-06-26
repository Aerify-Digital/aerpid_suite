import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import Favorite from './Favorite';

export default function FavoriteSettings() {
  return (
    <Grid item xs={6}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography
              variant="h6"
              align="center"
              className="!font-medium !text-xl !bg-[#25262f35] pt-2 pb-2"
            >
              Favorites
            </Typography>
          </Grid>
          <Divider className="!mb-4" />
          <Grid item container spacing={2} justifyContent="center">
            <Grid item textAlign="center" justifyContent="center">
              <Favorite favNum={1} />
            </Grid>
            <Grid item textAlign="center" justifyContent="center">
              <Favorite favNum={2} />
            </Grid>
            <Grid item textAlign="center" justifyContent="center">
              <Favorite favNum={3} />
            </Grid>
            <Grid item textAlign="center" justifyContent="center">
              <Favorite favNum={4} />
            </Grid>
            <Grid item textAlign="center">
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
