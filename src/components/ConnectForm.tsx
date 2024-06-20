import { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@mui/material';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { useConnectionContext } from '../contexts/ConnectionContext';

const baudRates = [
  4800, 9600, 14400, 19200, 38400, 57600, 115200, 128000, 230400, 256000,
  460800, 921600
];

export default function ConnectForm() {
  const connection = useConnectionContext();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minWidth: '100vw' }}
    >
      <Grid item>
        <Paper
          elevation={3}
          style={{
            paddingBottom: '4vmin',
            paddingTop: '4vmin',
            paddingLeft: '4vmin',
            paddingRight: '4vmin',
            backgroundColor: '#44475a'
          }}
        >
          <Typography variant="h6" style={{ color: '#f8f8f2' }}>
            AerPID USB Sync
          </Typography>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            alignContent="flex-start"
          >
            <Grid container item alignItems="center">
              <Grid item>
                <label style={{ color: '#f8f8f2' }}>Serial Port:</label>
              </Grid>
              <Grid item>
                <IconButton
                  style={{ color: '#8be9fd' }}
                  onClick={() => connection.updatePorts()}
                >
                  <AutorenewOutlinedIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
              <Select
                style={{ color: '#f8f8f2', backgroundColor: '#44475a' }}
                fullWidth
                defaultValue="none"
                value={connection.port}
                onChange={(e) => connection.setPort(e.target.value)}
                dir="down"
              >
                <MenuItem
                  key={`port_none`}
                  value="none"
                  disabled
                  style={{ color: '#f8f8f2', backgroundColor: '#44475a' }}
                >
                  Select a port
                </MenuItem>
                {connection.ports.map((port) => (
                  <MenuItem
                    key={`port_${port}`}
                    value={port}
                    style={{ color: '#f8f8f2', backgroundColor: '#44475a' }}
                  >
                    {port}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid container item>
              <Grid item>
                <label style={{ color: '#f8f8f2' }}>Baud Rate:</label>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
              <Select
                style={{ color: '#f8f8f2', backgroundColor: '#44475a' }}
                fullWidth
                defaultValue={
                  connection.baudRate ? connection.baudRate : 115200
                }
                value={connection.baudRate ? connection.baudRate : 115200}
                onChange={(e) => {
                  const newBaudRate = Number(e.target.value);
                  connection.setBaudRate(
                    isNaN(newBaudRate) ? 115200 : newBaudRate
                  );
                }}
                dir="down"
              >
                {baudRates.map((rate) => (
                  <MenuItem
                    key={`baud_${rate}`}
                    value={rate}
                    style={{ color: '#f8f8f2', backgroundColor: '#44475a' }}
                  >
                    {rate} {rate === 115200 && '(default)'}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item>
              <Button
                style={{
                  color: '#f8f8f2',
                  backgroundColor:
                    connection.port == 'none' || connection.connecting
                      ? '#44475a'
                      : '#6272a4'
                }}
                variant="contained"
                onClick={() => {
                  connection.connect();
                }}
                disabled={connection.port == 'none' || connection.connecting}
              >
                Connect
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
