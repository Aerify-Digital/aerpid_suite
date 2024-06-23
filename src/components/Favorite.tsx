import { Grid, TextField, Typography } from '@mui/material';

export interface FavoriteProps {
  favNum: 1 | 2 | 3 | 4;
}

export default function Favorite(props: FavoriteProps) {
  return (
    <Grid item container direction="row" spacing={2}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="overline" textAlign="center">
          Favorite {props.favNum}
        </Typography>
      </Grid>
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
  );
}
