import { Grid, Paper, TextField, Divider } from '@mui/material';

export interface FavoriteProps {
  favNum: 1 | 2 | 3 | 4;
}

export default function Favorite(props: FavoriteProps) {
  return (
    <>
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
    </>
  );
}
