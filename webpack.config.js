const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// To separate the CSS so that we can load it directly from dist/index.html, use the mini-css-extract-loader Webpack plugin.

const isProd = process.env.NODE_ENV !== 'production'

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

  //  devtool: "eval-cheap-module-source-map" offers SourceMaps that only maps lines (no column mappings) and are much faster. eval-source-map as being slow on builds and fast on rebuilds, and recommended for development
  //  devtool: "source-map" cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It’s something for production. source-map is slow on both build and rebuild, but tagged as suited for production because "A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it." 
  devtool: isProd  ? 'eval-cheap-module-source-map' : 'source-map', 

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
    path: path.resolve(__dirname, 'build'),
    // publicPath: 'auto' - There are chances that you don't know what the publicPath will be in advance, and webpack can handle it automatically for you by determining the public path from variables.
    publicPath: '/', 
    //  publicPath allows you to specify the base path for all the assets within your application. The publicPath will be used within our server script as well in order to make sure files are served correctly on http://localhost:3000

    // filename: 'chunk.[name].[chunkhash].js', // Creating chunk files with this name.
    // filename: `[name]${process.env.NODE_SHELL_ENV==='development' ? '' : 'chunk.[name].[chunkhash].js'`,

    // Note : ChunkHash should only be used in production. Use fullhash for development.
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].[fullhash].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? 'chunk.[name].[chunkhash].js' : 'chunk.[name].[fullhash].js',
    libraryTarget: 'umd',
    clean: true, // Clean the output directory before emit.
  },
  devServer: {
    headers: {
      "access-control-allow-origin": "*",
      // "Access-Control-Allow-Origin" :"*",
      'Access-Control-Allow-Credentials':true,
      "cache-control": "private, max-age=31536000",
    },
    server: 'http',   // Allows to set server and options (by default 'http'). we put https as well.
    allowedHosts: 'auto',
    // Prints compilation progress in percentage in the browser.
    client: {
      progress: true, // Prints compilation progress in percentage in the browser.
      reconnect: true, // Tells dev-server the number of times it should try to reconnect the client. When true it will try to reconnect unlimited times.
    },
    // stats: {
    //   cached: false
    // },
    port: 3000, // Application will run at port 3000
    historyApiFallback: true, // historyAPIFallback will redirect 404s to /index.html
    //  This option "static" allows configuring options for serving static files from the directory (by default 'public' directory). To disable set it to false.  static: false,
    static: {
      // It is recommended to use an absolute path.
      directory: path.join(__dirname, 'App.js'), // Tell the server where to serve the content from. This is only necessary if you want to serve static files. static.publicPath will be used to determine where the bundles should be served from and takes precedence.
      publicPath: '/serve-public-path-url',   // Tell the server at which URL to serve static.directory content. so when go to https://localhost:3000/serve-public-path-url then you can see you App,js component.
      serveIndex: true // serveIndex middleware generates directory listings on viewing directories that don't have an index.html file.
    },
    compress: true, // Enable gzip compression for everything served:
    hot: true, // use to keep reloading ui when some changes happens. "hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.
    // lazy: true,  // When devServer.lazy is enabled, the dev-server will only compile the bundle when it gets requested. This means that webpack will not watch any file changes. We call this lazy mode.
    // proxy: {
    //   '/api': 'https://localhost:3000'
    // }
  },
  module: {
    strictExportPresence: true,
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
      {
        test: /\.handlebars/,
        use: 'handlebars-loader',
        exclude: /node_modules/
      }
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

    // HtmlWebpackPlugin useful for webpack bundles that include a hash in the filename which changes every compilation. The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script
    new HtmlWebpackPlugin({
      template: path.resolve('./public/index.html'),
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
      hash: true,
      title: 'Development',
    }),

    // CleanWebpackPlugin is  A webpack plugin to remove/clean your build folder(s). when you run run npm start this plugin will remove the build folder which you created by npm run build. 
    new CleanWebpackPlugin({
      root: process.cwd(),
      verbose: true,
      dry: false,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json","!important.js", "!folder/**/*"],
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

  // Webpack does extra algorithmic work to optimize the output for size and load performance. These optimizations are performant for smaller codebases, 
  // but can be costly in larger ones:
  optimization: {
    minimize: true,
    // runtimeChunk: 'single', // This makes sure we only have a single runtime (with module cache) and modules are not instantiated twice. 
    // The optimization.runtimeChunk: 'single' was added when we have more than one entrypoint on a single HTML page.
    runtimeChunk: true,
    splitChunks: false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    minimizer: [new TerserPlugin({parallel: true,test: /\.js(\?.*)?$/i,terserOptions: {compress: false,mangle: true}})], // This plugin uses terser to minify/minimize your JavaScript. Works only with source-map, inline-source-map, hidden-source-map and nosources-source-map values for the devtool option.
    // parallel: true show improve the build for the start and production mode is by default heavier task to perform than 'development` mode build.
    // To boost the build speed, employ the multi-process approach with parallel running . Using parallelization in your build process can result in a significant increase in speed, making it a highly recommended approach. 
  },

  //  Some libraries import Node modules but don't use them in the browser. Tell Webpack to provide empty mocks for them so importing them works.
  // node: {
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // },

  // Turn off performance hints during development because we don't do any splitting or minification in interest of speed. These warnings become cumbersome.
  performance: false,
  
  // The externals configuration option provides a way of excluding dependencies from the output bundles. 
  // Instead, the created bundle relies on that dependency to be present in the consumer's (any end-user application) environment. 
  // This feature is typically most useful to library developers, however there are a variety of applications for it.
  
  // externals: {
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react',
  //   },
  // },
};
