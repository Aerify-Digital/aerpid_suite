import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Divider
} from '@mui/material';

export default function BumpSettings() {
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
              Bump
            </Typography>
          </Grid>
          <Divider className="!mb-4" />
          <Grid item container direction="column" spacing={2}>
            <Grid item textAlign="center">
              <TextField label="Bump Amount" variant="outlined" />
            </Grid>
            <Grid item textAlign="center">
              <TextField label="Bump Length" variant="outlined" />
            </Grid>
            <Grid item>
              <Box sx={{ pt: 2, pb: 2 }}>
                <Typography variant="subtitle2">
                  "Bump" is a feature that temporarily increases the operating
                  temperature of your AerTiny device: often used to clean the
                  heating element.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
