const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Clean = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './app/',
  output: {
    path: `${__dirname}/public`,
    filename: 'app.js'
  },
  plugins: [
    new Clean(['public']),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      unused: true,
      dead_code: true,
      minimize: true,
      output: { comments: false },
      warnings: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('bundle.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: './app/index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        use: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(svg)$/i,
        use: 'svg-url-loader',
        exclude: /node_modules/
      }
    ]
  }
};
