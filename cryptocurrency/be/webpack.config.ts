import path from 'path';
import { Configuration, EnvironmentPlugin } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

import dotenv from 'dotenv';

const env = dotenv.config().parsed;

const config: Configuration = {
  mode: process.env.NODE_ENV as 'development' | 'production' || 'development',
  target: 'node',
  context: path.join(__dirname, 'src'),
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts'],
  },
  plugins: [
    new EnvironmentPlugin(env),
  ],
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
  },
  externals: [nodeExternals()],
};

export default config;