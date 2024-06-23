import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
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
    <Grid item spacing={2}>
      <Box sx={{ m: 1 }}>
        <Paper sx={{ pt: 2, pb: 2, pl: 2, pr: 2 }}>
          <Grid item sx={{ pb: 2 }}>
            <Typography variant="h6" textAlign="center">
              PID
            </Typography>
          </Grid>
          <Grid item textAlign="center">
            <TextField
              label="P (Proportional)"
              variant="outlined"
              name="P"
              value={pid.P}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item textAlign="center">
            <TextField
              label="I (Integral)"
              variant="outlined"
              name="I"
              value={pid.I}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item textAlign="center">
            <TextField
              label="D (Derivative)"
              variant="outlined"
              name="D"
              value={pid.D}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Box sx={{ pt: 2, pb: 2 }}>
              <Typography variant="subtitle2">
                Always use Caution when changing your PID Values; even small
                changes can cause severe reactions to the heating process. To be
                safe try making small changes to one variable at a time.
              </Typography>
            </Box>
          </Grid>
          <Grid item textAlign="center">
            <Button variant="contained" onClick={updatePID}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </Box>
    </Grid>
  );
}
