const path = require('path');
const SRC_DIR = path.join(__dirname, '/public/src');
module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['Google Chrome', 'Firefox'],
    frameworks: ['mocha'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.js'
    ],
    preprocessors: {
      'src/public/AppEntry.js': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            include: SRC_DIR
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              plugins: ['transform-decorators-legacy', 'transform-regenerator'],
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.json$/,
            loader: 'json-loader',
          },
          {
            test: /\.scss$/,
            loader: 'style!css!sass?outputStyle=expanded',
          }
        ]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['nyan'],
    nyanReporter: {
      suppressErrorHighlighting: false,
    },
    
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
  });
};