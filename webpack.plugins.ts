import { ProvidePlugin } from 'webpack';
// eslint-disable-next-line import/default
import type ICopyPlugin from 'copy-webpack-plugin';
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin: typeof ICopyPlugin = require('copy-webpack-plugin');
export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure'
  }),
  new CopyPlugin({
    patterns: [{ from: './src/img/favicon.ico', to: './img/favicon.ico' }]
  }),
  new ProvidePlugin({
    process: 'process/browser'
  })
];
