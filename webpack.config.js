const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// To separate the CSS so that we can load it directly from dist/index.html, use the mini-css-extract-loader Webpack plugin.

const isProd = process.env.NODE_SHELL_ENV === 'production';

// this will update the process.env with environment variables in .env file
dotenv.config();

module.exports = {
  name: 'React Bundle',

  // production || development
  mode: 'development',
  // Inform webpack that we're building a bundle
  // for web, rather then for the browser
  target: 'web',

  // Tell webpack the root file of our
  entry: './src/index.js',

  devtool: isProd && 'source-map',

  resolve: {
    alias: {
      process: 'process/browser',
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // other stuff
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
    },
  },

  // Tell webpack where to put the output file that is generated
  output: {
    path: path.resolve(__dirname, '/build'),
    publicPath: '/', // publicPath allows you to specify the base path for all the assets within your application.
    filename: 'chunk.[name].[chunkhash].js', // Creating chunk files with this name.
    // filename: `[name]${process.env.NODE_SHELL_ENV==='development' ? '' : 'chunk.[name].[chunkhash].js'`,
    libraryTarget: 'umd',
    clean: true,
  },
  devServer: {
    // Prints compilation progress in percentage in the browser.
    client: {
      progress: true,
    },
    // stats: {
    //   cached: false
    // },
    port: 3000,
    historyApiFallback: true, // historyAPIFallback will redirect 404s to /index.html
    static: {
      directory: path.join(__dirname, '/build'),
      publicPath: '/build',
      serveIndex: true
    },
    compress: true,
    hot: true, // use to keep reloading ui when some changes happens.
    // lazy: true,  // When devServer.lazy is enabled, the dev-server will only compile the bundle when it gets requested. This means that webpack will not watch any file changes. We call this lazy mode.
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
      },
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
            presets: ['@babel/preset-env'],
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
    new CleanObsoleteChunks({
      // Write logs to console.
      // Default: true
      verbose: true,

      // Clean obsolete chunks of webpack child compilations.
      // Default: false
      deep: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
    //   DEBUG: false,
    // }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],

  // plugins:[
  //   new webpack.DefinePlugin({
  //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  //     WEBPACK: true
  //   }),
  // ],

  // plugins: [
  //   new webpack.ProvidePlugin({
  //     process: 'process/browser',
  //   }),
  // ],

  optimization: {
    minimize: true,
  },
};
