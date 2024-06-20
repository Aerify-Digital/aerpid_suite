import crypto from 'crypto';
import { useEffect, useState } from 'react';
import DeviceModel from '../enum/DeviceModel';
import { Grid, Typography } from '@mui/material';
import { ESPLoader, FlashOptions, LoaderOptions, Transport } from 'esptool-js';
import { useConnectionContext } from '../contexts/ConnectionContext';

export default function Update() {
  const espLoaderTerminal = {
    clean() {
      //term.clear();
    },
    writeLine(data: any) {
      //term.writeln(data);
    },
    write(data: any) {
      //term.write(data);
    }
  };
  const connection = useConnectionContext();
  const [modelName, setModelName] = useState('' as string | undefined);
  useEffect(() => {
    const state = (window as any).pidState.data();
    if (state.MODEL !== undefined) {
      switch (state.MODEL) {
        case DeviceModel.AerPIDv3:
          setModelName('AerPID v3');
          break;
        case DeviceModel.AerPIDv3HP:
          setModelName('AerPID v3 HP');
          break;
        default:
          setModelName(undefined);
          break;
      }
    }
  }, []);

  const flash = async (file: File) => {
    const device = await (navigator as any).serial.requestPort({});
    const transport = new Transport(device);
    const flashOptions = {
      transport,
      baudrate: 921600,
      terminal: espLoaderTerminal
    } as LoaderOptions;
    const loader = new ESPLoader(flashOptions);
    await loader.write_flash({
      fileArray: [],
      flashSize: '16MB',
      flashMode: 'dio',
      flashFreq: '40m',
      eraseAll: false,
      compress: true,
      reportProgress: (fileIndex, written, total) => {
        //report the progress somewhere
      },
      calculateMD5Hash: (image: string) => {
        const hash = crypto.createHash('md5').digest('hex');
        return hash;
      }
    } as FlashOptions);
  };
  return (
    <Grid container direction="column" item>
      <Grid item alignContent="center">
        <Grid item sx={{ mt: 3, ml: 2 }}>
          <Typography variant="h5" align="left">
            Update Firmware
            {modelName && modelName.length > 0 ? ` for ${modelName}` : ''}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
