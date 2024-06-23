import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export default function PidSettings() {
  const [pid, setPid] = useState({ P: '', I: '', D: '' });
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPid((prev: any) => ({ ...prev, [name]: value }));
  };

  const updatePID = () => {
    //TODO: PID stuff
  };
  return (
    <Grid
      item
      container
      direction="column"
      spacing={2}
      sx={{ pl: 2, pr: 2 }}
      alignContent="center"
    >
      <Paper>
        <Typography variant="h6" textAlign="center">
          PID
        </Typography>
        <Grid item>
          <TextField
            label="P (Proportional)"
            variant="outlined"
            name="P"
            value={pid.P}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="I (Integral)"
            variant="outlined"
            name="I"
            value={pid.I}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label="D (Derivative)"
            variant="outlined"
            name="D"
            value={pid.D}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            Always use Caution when changing your PID Values; even small changes
            can cause severe reactions to the heating process. To be safe try
            making small changes to one variable at a time.
          </Typography>
        </Grid>
        <Grid item textAlign="center">
          <Button variant="contained" onClick={updatePID}>
            Submit
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
