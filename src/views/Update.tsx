import { useEffect, useState } from 'react';
import DeviceModel from '../enum/DeviceModel';

export default function Update() {
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
  return (
    <div>
      Update Firmware
      {modelName && modelName.length > 0 ? ` for ${modelName}` : ''}
    </div>
  );
}
