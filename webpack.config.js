const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const srcDir = path.join(__dirname, 'src')
const node_modulesDir = path.join(__dirname, 'node_modules')

module.exports = {
  entry: path.join(srcDir, 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  resolve: {
    alias: { '~': srcDir }
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: srcDir
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader',
        include: srcDir
      },
      {
        test: /\.ini$/,
        loader: 'ini-loader',
        include: srcDir
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
        include: srcDir,
        options: {
          attrkey: 'attributes',
          childkey: 'children',
          explicitChildren: true,
          charsAsChildren: true
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      inject: false
    })
  ]
}