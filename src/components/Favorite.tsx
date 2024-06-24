import { Grid, Paper, TextField } from '@mui/material';

export interface FavoriteProps {
  favNum: 1 | 2 | 3 | 4;
}

export default function Favorite(props: FavoriteProps) {
  return (
    <Paper elevation={3} sx={{ mr: 4, ml: 4, mt: 2, p: 2 }}>
      <Grid container item justifyContent="center" spacing={2}>
        <Grid item xs={12} textAlign="center">
          <TextField
            label={`Favorite ${props.favNum} Name`}
            variant="outlined"
            onChange={() => {}}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <TextField
            label={`Favorite ${props.favNum} Temp`}
            variant="outlined"
            onChange={() => {}}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
