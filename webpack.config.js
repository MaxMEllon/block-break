const webpack = require('webpack');
const path = require('path');
const { name } = require('./package.json');

const DEBUG = process.env.NODE_ENV !== 'production';

const green = '\u001b[32m';
const reset = '\u001b[0m';

console.log(`[DEBUG] ==> ${green}${DEBUG}${reset}`);

const configs = {
  entry: {
    app: [
      './src/main.js',
    ],
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },
};

switch (process.env.NODE_ENV) {
  case 'production':
    configs.plugins = [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ];
    configs.devtool = '';
    break;

  default:
    configs.plugins = [
    ];
    configs.devtool = 'cheap-module-eval-source-map';
    break;
}

module.exports = configs;
