const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // publicPath allows you to specify the base path for all the assets within your application.
    filename: 'chunk.[name].[chunkhash].js', // Creating chunk files with this name.
  },
  devServer: {
    port: 3000,
    historyApiFallback: true, // historyAPIFallback will redirect 404s to /index.html
    static: {
      directory: path.join(__dirname, '/build'),
      publicPath: '/build',
    },
    hot: true, // use to keep reloading ui when some changes happens.
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/, require.resolve('./public/index.html')],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, require.resolve('./public/index.html')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
