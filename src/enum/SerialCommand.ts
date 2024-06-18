enum SerialCommand {
  INIT = 0x20,
  STATUS = 0x21,
  AUTO_OFF_LENGTH = 0x35,
  AUTO_OFF_TOGGLE = 0x32,
  ADJUST_AMOUNT = 0x24,
  BLE = 0x50,
  BUMP_AMOUNT = 0x44,
  BUMP_LENGTH = 0x45,
  BUMP_TOGGLE = 0x42,
  COIL_TOGGLE = 0x52,
  ESP = 0x00,
  FAV_1 = 0x86,
  FAV_2 = 0x87,
  FAV_3 = 0x88,
  FAV_4 = 0x89,
  LED = 0x70,
  PID = 0x90,
  TEMP = 0x10,
  WIFI = 0x60
}

export default SerialCommand;
