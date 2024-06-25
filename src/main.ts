import path from 'path';
import fs from 'fs-extra';
import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  MenuItemConstructorOptions,
  shell
} from 'electron';
import Server from './ipc/server';
import axios from 'axios';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;
let server: Server;
let isUpdateAvailable = false;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: `AerPID Suite`,
    roundedCorners: false,
    minHeight: 600,
    minWidth: 800,
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: true
    },
    icon: './src/img/favicon.ico'
  });
  const createMenu = (isConnected: boolean) => {
    const template: MenuItemConstructorOptions[] = [];

    if (isConnected) {
      template.push({
        label: 'AerPID',
        submenu: [
          {
            label: 'Home',
            accelerator: 'CmdOrCtrl+H',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/home';`
              );
            }
          },
          {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+Shift+P',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/preferences';`
              );
            }
          },
          {
            label: 'DevTools',
            accelerator: 'CmdOrCtrl+Shift+I',
            click: function () {
              mainWindow.webContents.toggleDevTools();
            }
          },

          {
            label: 'Disconnect',
            accelerator: 'CmdOrCtrl+D',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.electronAPI.disconnect();`
              );
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function () {
              app.quit();
            }
          }
        ]
      });
      template.push({
        label: 'Settings',
        submenu: [
          {
            label: 'Device Settings',
            accelerator: 'CmdOrCtrl+Shift+S',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/settings';`
              );
            }
          },
          {
            label: 'Heater',
            accelerator: 'CmdOrCtrl+Shift+H',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/heater';`
              );
            }
          },
          {
            label: 'Lights',
            accelerator: 'CmdOrCtrl+Shift+L',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/lights';`
              );
            }
          },
          {
            label: 'Communications',
            accelerator: 'CmdOrCtrl+Shift+C',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/communications';`
              );
            }
          }
        ]
      });
      template.push({
        label: 'Utilities',
        submenu: [
          {
            label: 'Serial Console',
            accelerator: 'CmdOrCtrl+Shift+X',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/console';`
              );
            }
          },
          {
            label: 'Graphs',
            accelerator: 'CmdOrCtrl+Shift+G',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/graphs';`
              );
            }
          }
        ]
      });
    } else {
      template.push({
        label: 'AerPID',
        submenu: [
          {
            label: 'Preferences',
            accelerator: 'CmdOrCtrl+Shift+P',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.location.hash = '#/preferences';`
              );
            }
          },
          {
            label: 'Serial Setup',
            accelerator: 'CmdOrCtrl+S',
            click: function () {
              mainWindow.webContents.executeJavaScript(
                `window.electronAPI.disconnect();`
              );
            }
          },
          {
            label: 'DevTools',
            accelerator: 'CmdOrCtrl+Shift+I',
            click: function () {
              mainWindow.webContents.toggleDevTools();
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click: function () {
              app.quit();
            }
          }
        ]
      });
    }

    template.push({
      label: 'Contact',
      click: function () {
        mainWindow.webContents.executeJavaScript(
          `window.location.hash = '#/contact';`
        );
      }
    });
    if (isUpdateAvailable) {
      template.push({
        label: 'Update Firmware',
        accelerator: 'CmdOrCtrl+Shift+U',
        click: function () {
          mainWindow.webContents.executeJavaScript(
            `window.location.hash = '#/update';`
          );
        }
      });
    }
    return template as MenuItemConstructorOptions[];
  };

  ipcMain.handle('open-external', async (event, url) => {
    await shell.openExternal(url);
  });

  ipcMain.on('serial-console', (event, data) => {
    event.sender.send('serial-console', data);
  });

  ipcMain.on('request-update-menu', (event, isConnected: boolean) => {
    const template: MenuItemConstructorOptions[] = createMenu(isConnected);
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  });

  ipcMain.on(
    'check-firmware-update',
    (event, modelNumber: number, firmwareVersion: string) => {
      let url: string | undefined = undefined;
      let downloadUrl: string | undefined = undefined;
      let fileName: string | undefined = undefined;
      switch (modelNumber) {
        case 1:
        case 2:
          url =
            'https://raw.githubusercontent.com/Aerify-Digital/AerPID3/master/version.json';
          downloadUrl = `https://github.com/Aerify-Digital/AerPID3/releases/download/v%versionString%/aerpid${modelNumber === 1 ? '' : '-hp'}_v%versionString%.tar.gz`;
          fileName = `aerpid${modelNumber === 1 ? '' : '-hp'}_v%versionString%.tar.gz`;
          break;
        default:
          break;
      }
      if (!url) {
        console.error('Invalid model number');
        return;
      }
      const checkForUpdates = async () => {
        try {
          const response = await axios.get(url, {
            headers: {
              Accept: 'application/json'
            }
          });
          const versionInfo = response.data;
          if (process.env.NODE_ENV === 'development') {
            console.log(`Current Firmware Version: ${firmwareVersion}`);
            console.log(
              `Found FirmwareVersion: ${JSON.stringify(versionInfo)}`
            );
          }
          const [VER_MAJOR, VER_MINOR, VER_BUILD] = firmwareVersion
            .split('.')
            .map((v) => parseInt(v));

          let isNewer = false;
          const currentVersion = [VER_MAJOR, VER_MINOR, VER_BUILD];
          const fetchedVersion = [
            parseInt(versionInfo.version.VER_MAJOR),
            parseInt(versionInfo.version.VER_MINOR),
            parseInt(versionInfo.version.VER_BUILD)
          ];
          for (let i = 0; i < currentVersion.length; i++) {
            if (fetchedVersion[i] > currentVersion[i]) {
              isNewer = true;
              break;
            } else if (fetchedVersion[i] < currentVersion[i]) {
              break;
            }
          }
          const versionString = `${versionInfo.version.VER_MAJOR}.${versionInfo.version.VER_MINOR}.${versionInfo.version.VER_BUILD}`;
          if (isNewer || `${firmwareVersion}` !== `${versionString}`) {
            const firmwarePath = path.join(
              app.getPath('userData'),
              'firmware_cache'
            );
            fs.ensureDirSync(firmwarePath);

            const savePath = path.join(
              firmwarePath,
              fileName.replace(/%versionString%/g, versionString)
            );
            if (!fs.existsSync(savePath)) {
              dialog
                .showMessageBox({
                  type: 'info',
                  message: `New firmware version available: v${versionString}`,
                  buttons: ['Download', 'Cancel'],
                  defaultId: 0,
                  cancelId: 1
                })
                .then((result) => {
                  if (result.response === 0) {
                    if (process.env.NODE_ENV === 'development') {
                      console.log('Downloading firmware update');
                    }

                    axios({
                      url: downloadUrl.replace(
                        /%versionString%/g,
                        versionString
                      ),
                      method: 'GET',
                      responseType: 'stream'
                    })
                      .then((response) => {
                        response.data.pipe(fs.createWriteStream(savePath));
                        isUpdateAvailable = true;
                        dialog.showMessageBox({
                          type: 'info',
                          message: `Firmware download complete.\nInitiate a firmware update from the menu to install v${versionString}`,
                          buttons: ['OK'],
                          defaultId: 0,
                          cancelId: 0
                        });
                        createMenu(true);
                      })
                      .catch((e) => {
                        dialog.showMessageBox({
                          type: 'error',
                          message: `Error: Firmware failed to download.\n${(e as any).message ? (e as any).message : 'An unknown error occurred'}`,
                          buttons: ['OK'],
                          defaultId: 0,
                          cancelId: 0
                        });
                      });
                  }
                });
            } else {
              isUpdateAvailable = true;
              dialog.showMessageBox({
                type: 'info',
                message: `An updated firmware is available and already downloaded.\nInitiatiate a firmware update from the menu to install v${versionString}`,
                buttons: ['OK'],
                defaultId: 0,
                cancelId: 0
              });
            }
          } else if (process.env.NODE_ENV === 'development') {
            console.log('No new firmware updates available');
          }
        } catch (error) {
          console.error('Failed to check for updates:', error);
        }
      };
      if (server && server.get('checkFirmwareOnConnect') === true) {
        checkForUpdates().then(() => {
          event.sender.send('update-menu', true);
        });
      }
    }
  );

  const template: MenuItemConstructorOptions[] = createMenu(false);

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY, {
    extraHeaders:
      "Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
  });
  server = new Server(mainWindow);
  server.setup();

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
