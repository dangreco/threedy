import PreactRefreshPlugin from '@prefresh/webpack';
import path from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const isDevelopment = process.env.NODE_ENV !== 'production';

const devServer: DevServerConfiguration = {
  client: {
    webSocketURL: `ws://127.0.0.1:5000/ws`,
    overlay: false,
  },
  open: false,
  port: 5000,
  static: './dist',
  allowedHosts: 'all',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
};

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.ts',
  devServer,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new PreactRefreshPlugin(),
  ].filter(Boolean),
};

export default config;
