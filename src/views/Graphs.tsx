import { useNavigate } from 'react-router-dom';
import { useConnectionContext } from '../contexts/ConnectionContext';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

export default function Graphs() {
  const connection = useConnectionContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!connection.connected) {
      navigate('/');
    }
  }, [connection.connected]);
  return connection.connected ? (
    <Box sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
      <Grid container direction="column" item>
        <Grid item alignContent="center">
          <Grid item sx={{ mt: 3, ml: 2 }}>
            <Typography variant="h5" align="left">
              Graphs
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
}
