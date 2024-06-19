import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import fs from 'fs-extra';
import path from 'path';
import { spawn } from 'child_process';

const config: ForgeConfig = {
  packagerConfig: {
    executableName: 'AerPID Suite',
    asar: {
      unpack: './node_modules/serialport/**/*'
    },
    icon: './src/img/favicon'
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({
      options: {
        productName: 'AerPID Suite',
        bin: 'aerpid_suite'
      }
    })
  ],
  hooks: {
    readPackageJson: async (forgeConfig, packageJson) => {
      if (Object.keys(packageJson.dependencies).length === 0) {
        const originalPackageJson = await fs.readJson(
          path.resolve(__dirname, 'package.json')
        );
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const webpackConfigJs = require('./webpack.renderer.config.js');
        Object.keys(webpackConfigJs.externals).forEach((p) => {
          packageJson.dependencies[p] = originalPackageJson.dependencies[p];
        });
      }
      return packageJson;
    },
    packageAfterPrune: async (forgeConfig, buildPath) => {
      return new Promise((resolve, reject) => {
        const npmInstall = spawn('npm', ['install'], {
          cwd: buildPath,
          stdio: 'inherit',
          shell: true
        });

        npmInstall.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error('process finished with error code ' + code));
          }
        });

        npmInstall.on('error', (error) => {
          reject(error);
        });
      });
    }
  },
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy:
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self';",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts'
            }
          }
        ]
      }
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true
    })
  ]
};

export default config;
