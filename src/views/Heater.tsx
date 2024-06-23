import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography
} from '@mui/material';

export default function Heater() {
  const connection = useConnectionContext();
  const navigate = useNavigate();
  const [pid, setPid] = useState({ P: '', I: '', D: '' });

  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPid((prev: any) => ({ ...prev, [name]: value }));
  };

  const updatePID = () => {
    //TODO: PID stuff
  };
  return connection.connected ? (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }} direction="row">
          <Typography variant="h5" align="left">
            Heater Settings
          </Typography>
        </Grid>
        <Grid item container>
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
                  Always use Caution when changing your PID Values; even small
                  changes can cause severe reactions to the heating process. To
                  be safe try making small changes to one variable at a time.
                </Typography>
              </Grid>
              <Grid item textAlign="center">
                <Button variant="contained" onClick={updatePID}>
                  Submit
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            sx={{ pl: 2, pr: 2 }}
            alignContent="center"
          >
            <Grid
              item
              container
              direction="row"
              spacing={2}
              sx={{ pl: 2, pr: 2 }}
            >
              <Grid item xs={6}>
                <Paper>
                  <Typography variant="h6" textAlign="center">
                    Bump
                  </Typography>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        label="Bump Amount"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Bump Length"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        "Bump" is a feature that temporarily increases the
                        operating temperature of your AerTiny device: often used
                        to clean the heating element.
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6}>
                <Paper>
                  <Typography variant="h6" textAlign="center">
                    Auto-Off
                  </Typography>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <FormControlLabel
                        control={<Switch color="primary" onChange={() => {}} />}
                        label="Enabled"
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label="Idle Length (in seconds)"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        "Auto-Off" is one of several built in safety features of
                        your AerTiny Device. This feature allows helps to
                        allieviate some worry while out and about that you may
                        have left your heating element on.
                        <br />
                        <br />
                        After the set amount of time of no activity, your device
                        will turn off the heating element.
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}
