const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/',
  output: {
    path: `${__dirname}/public`,
    filename: 'app.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.html',
      cache: false,
      alwaysWriteToDisk: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html/,
        use: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(svg)$/i,
        use: 'svg-url-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3000,
    hot: false,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: `${__dirname}/public/`
  }
};
