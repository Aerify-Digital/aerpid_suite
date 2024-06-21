export const getNumber: (data: Readonly<number[]>) => number = (
  data: Readonly<number[]>
) => {
  return Number(`0x${Buffer.from(data).toString('hex')}`);
};

export const doubleToBytes = (inputNumber: number) => {
  const buffer = new ArrayBuffer(8); // 8 bytes for a double
  const view = new DataView(buffer);
  view.setFloat64(0, inputNumber, true); // 'true' for little-endian

  return new Uint8Array(buffer);
};

export const bytesToDouble = (bytes: Uint8Array) => {
  if (bytes.length !== 8) {
    throw new Error(
      'Input byte array must be 8 bytes in length to represent a double.'
    );
  }

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);

  for (let i = 0; i < 8; i++) {
    view.setUint8(i, bytes[i]);
  }

  return parseFloat(view.getFloat64(0, true).toFixed(3));
};
