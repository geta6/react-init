import path from 'path';
import util from 'gulp-util';
import webpack from 'webpack';
import merge from 'lodash/object/merge';

const DEBUG = !process.argv.includes('--release');
const WATCH = process.argv.includes('--watch');
const VERBOSE = process.argv.includes('--verbose');
const JS_LOADER = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'babel',
};

util.log('[webpack]', `debug mode:  ${DEBUG ? 'on' : 'off'}`);
util.log('[webpack]', `watch mode:  ${WATCH ? 'on' : 'off'}`);
util.log('[webpack]', `verbose:     ${VERBOSE ? 'on' : 'off'}`);

// Common configuration chunk to be used for both bundles

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'process.env.TIMEOUT': `'${process.env.TIMEOUT}'`,
      __DEV__: 'false',
    }),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: ['url?limit=10000', 'img?minimize'],
      },
    ],
  },
};

// Configuration for the client-side bundle

const clientConfig = merge({}, config, {
  entry: [
    ...(WATCH ? ['webpack-hot-middleware/client'] : []),
    './src/client.js',
  ],

  output: {
    path: path.join(__dirname, './build/public'),
    filename: DEBUG ? 'client.js' : 'client.js',
  },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [
    ...config.plugins,
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: VERBOSE}}),
      new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
    ...(WATCH ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : []),
  ],

  module: {
    loaders: [
      WATCH ? {
        ...JS_LOADER,
        query: {
          plugins: ['react-transform'],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module'],
                }, {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react'],
                },
              ],
            },
          },
        },
      } : JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.styl$/,
        loaders: ['style/useable', 'css?minimize', 'stylus'],
      },
    ],
  },
});

// Configuration for the server-side bundle

const serverConfig = merge({}, config, {
  entry: './src/server.js',

  output: {
    path: './build',
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  externals: [
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/);
      cb(null, Boolean(isExternal));
    },
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map',

  plugins: [
    ...config.plugins,
    new webpack.BannerPlugin('require("source-map-support").install();', {raw: true, entryOnly: false}),
  ],

  module: {
    loaders: [
      JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.styl$/,
        loaders: ['css?minimize', 'stylus'],
      },
    ],
  },
});

export default [clientConfig, serverConfig];
