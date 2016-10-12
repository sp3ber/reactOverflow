const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './app/',
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js/,
        loader: 'react-hot!babel',
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        loader: 'raw',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: 'style!css!sass!postcss!sass-resources'
      },
      {
        test: /\.css/,
        loader: 'style!css'
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-url-loader',
        exclude: /node_modules/
      }
    ]
  },
  postcss: () => [autoprefixer],
  sassResources: ['./app/assets/scss/variables.scss'],
  devtool: "inline-source-map"
};