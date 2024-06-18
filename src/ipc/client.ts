export const getAppVersion = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const version = await (window as any).electronAPI.getAppVersion();
  if (document.getElementById('app_version'))
    (document.getElementById('app_version') as HTMLElement).innerHTML = version;
  return version;
};

export const getSerialPort = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (window as any).electronAPI.getSerialPort();
};

export const setSerialPort = async (path: string, baudRate: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await (window as any).electronAPI.setSerialPort(path, baudRate);
};

export const listSerialPorts = async () => {
  if (document.getElementById('com_ports')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ports = await (window as any).electronAPI.listSerialPorts();
    for (const port of ports) {
      const option = document.createElement('option') as HTMLOptionElement;
      option.value = port.path;
      option.innerHTML = port.path;
      (
        document.getElementById('com_ports') as unknown as HTMLOptionsCollection
      ).add(option);
    }
  }
};

export const init = async (data: string) => {
  const split: string[] = data.split(':');
  if (data.length !== 32) {
    throw new Error('Malformed init data');
  }
  const [
    idk, //TODO: figure out what is the first element
    fw_ver, // 1
    nt_ver, // 2
    ip_add, // 3
    ssid, // 4
    hostname, // 5
    uptime, // 6
    bump_amt, // 7
    bump_l, // 8
    aoff_en, // 9
    aoff_time, // 10
    leden_stat, // 11
    leden_ambient, // 12
    leden_preset, // 13
    fav1_n, // 14
    fav2_n, // 15
    fav3_n, // 16
    fav4_n, // 17
    fav1_t, // 18
    fav2_t, // 19
    fav3_t, // 20
    fav4_t, // 21
    //fav1q_n,      // 14
    //fav2q_n,      // 15
    //fav3q_n,      // 16
    //fav4q_n,      // 17
    //fav1q_t,      // 18
    //fav2q_t,      // 19
    //fav3q_t,      // 20
    //fav4q_t,      // 21
    adj, // 22
    leden_pulse, // 23
    leden_blink, // 24
    wifi_en, // 25
    bt_en, // 26
    bt_disc, // 27
    bt_mon, // 28
    usb_en, // 29
    usb_disc, // 30
    usb_mon // 31
  ] = split;
  if (document.getElementById('fw_ver'))
    (document.getElementById('fw_ver') as HTMLInputElement).value = fw_ver;
  if (document.getElementById('nt_ver'))
    (document.getElementById('nt_ver') as HTMLInputElement).value = nt_ver;
  if (document.getElementById('ip_add'))
    (document.getElementById('ip_add') as HTMLInputElement).value = ip_add;
  if (document.getElementById('ssid'))
    (document.getElementById('ssid') as HTMLInputElement).value = ssid;
  if (document.getElementById('hostname'))
    (document.getElementById('hostname') as HTMLInputElement).value = hostname;
  if (document.getElementById('uptime'))
    (document.getElementById('uptime') as HTMLInputElement).value = uptime;
  if (document.getElementById('bump_amt'))
    (document.getElementById('bump_amt') as HTMLInputElement).value = bump_amt;
  if (document.getElementById('bump_l'))
    (document.getElementById('bump_l') as HTMLInputElement).value = bump_l;
  if (document.getElementById('aoff_en'))
    (document.getElementById('aoff_en') as HTMLInputElement).checked =
      aoff_en === '1';
  if (document.getElementById('aoff_time'))
    (document.getElementById('aoff_time') as HTMLInputElement).value =
      aoff_time;
  if (document.getElementById('leden_stat'))
    (document.getElementById('leden_stat') as HTMLInputElement).checked =
      leden_stat === '1';
  if (document.getElementById('leden_ambient'))
    (document.getElementById('leden_ambient') as HTMLInputElement).checked =
      leden_ambient === '1';
  if (document.getElementById('leden_preset'))
    (document.getElementById('leden_preset') as HTMLInputElement).checked =
      leden_preset === '1';
  if (document.getElementById('fav1_n'))
    (document.getElementById('fav1_n') as HTMLInputElement).value = fav1_n;
  if (document.getElementById('fav2_n'))
    (document.getElementById('fav2_n') as HTMLInputElement).value = fav2_n;
  if (document.getElementById('fav3_n'))
    (document.getElementById('fav3_n') as HTMLInputElement).value = fav3_n;
  if (document.getElementById('fav4_n'))
    (document.getElementById('fav4_n') as HTMLInputElement).value = fav4_n;
  if (document.getElementById('fav1_t'))
    (document.getElementById('fav1_t') as HTMLInputElement).value = fav1_t;
  if (document.getElementById('fav2_t'))
    (document.getElementById('fav2_t') as HTMLInputElement).value = fav2_t;
  if (document.getElementById('fav3_t'))
    (document.getElementById('fav3_t') as HTMLInputElement).value = fav3_t;
  if (document.getElementById('fav4_t'))
    (document.getElementById('fav4_t') as HTMLInputElement).value = fav4_t;
  if (document.getElementById('fav1q_n'))
    (document.getElementById('fav1q_n') as HTMLInputElement).innerHTML =
      fav1_n + '&deg;F';
  if (document.getElementById('fav2q_n'))
    (document.getElementById('fav2q_n') as HTMLInputElement).innerHTML =
      fav2_n + '&deg;F';
  if (document.getElementById('fav3q_n'))
    (document.getElementById('fav3q_n') as HTMLInputElement).innerHTML =
      fav3_n + '&deg;F';
  if (document.getElementById('fav4q_n'))
    (document.getElementById('fav4q_n') as HTMLInputElement).innerHTML =
      fav4_n + '&deg;F';
  if (document.getElementById('fav1q_t'))
    (document.getElementById('fav1q_t') as HTMLInputElement).innerHTML = fav1_t;
  if (document.getElementById('fav2q_t'))
    (document.getElementById('fav2q_t') as HTMLInputElement).innerHTML = fav2_t;
  if (document.getElementById('fav3q_t'))
    (document.getElementById('fav3q_t') as HTMLInputElement).innerHTML = fav3_t;
  if (document.getElementById('fav4q_t'))
    (document.getElementById('fav4q_t') as HTMLInputElement).innerHTML = fav4_t;
  switch (adj) {
    case '1':
      if (document.getElementById('adj_1'))
        (document.getElementById('adj_1') as HTMLInputElement).disabled = true;
      break;
    case '2':
      if (document.getElementById('adj_2'))
        (document.getElementById('adj_2') as HTMLInputElement).disabled = true;
      break;
    case '5':
      if (document.getElementById('adj_5'))
        (document.getElementById('adj_5') as HTMLInputElement).disabled = true;
      break;
    case '10':
      if (document.getElementById('adj_10'))
        (document.getElementById('adj_10') as HTMLInputElement).disabled = true;
      break;
    case '20':
      if (document.getElementById('adj_20'))
        (document.getElementById('adj_20') as HTMLInputElement).disabled = true;
      break;
    default:
      if (document.getElementById('adj_1'))
        (document.getElementById('adj_1') as HTMLInputElement).disabled = true;
      break;
  }
  if (document.getElementById('leden_pulse'))
    (document.getElementById('leden_pulse') as HTMLInputElement).checked =
      leden_pulse === '1';
  if (document.getElementById('leden_blink'))
    (document.getElementById('leden_blink') as HTMLInputElement).checked =
      leden_blink === '1';
  if (document.getElementById('wifi_en'))
    (document.getElementById('wifi_en') as HTMLInputElement).checked =
      wifi_en === '1';
  if (document.getElementById('bt_en'))
    (document.getElementById('bt_en') as HTMLInputElement).checked =
      bt_en === '1';

  /*
    if (split[27] == "0"){ document.getElementById("bt_disc").checked = false;}
    else { document.getElementById("bt_disc").checked = true; }
  */

  if (document.getElementById('bt_mon'))
    (document.getElementById('bt_mon') as HTMLInputElement).checked =
      bt_mon === '1';
  if (document.getElementById('usb_en'))
    (document.getElementById('usb_en') as HTMLInputElement).checked =
      usb_en === '1';
  if (document.getElementById('usb_disc'))
    (document.getElementById('usb_disc') as HTMLInputElement).checked =
      usb_disc === '1';
  if (document.getElementById('usb_mon'))
    (document.getElementById('usb_mon') as HTMLInputElement).checked =
      usb_mon === '1';
};
