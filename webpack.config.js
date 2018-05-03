const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const srcFolder = path.join(__dirname, 'src')

module.exports = {
  entry: path.join(srcFolder, 'index.js'),
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
    alias: { '': srcFolder }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: srcFolder
      },
      {
        test: /\.json5$/,
        loader: 'json5-loader',
        include: srcFolder
      },
      {
        test: /\.ini$/,
        loader: 'ini-loader',
        include: srcFolder
      },
      {
        test: /\.xml$/,
        loader: 'xml-loader',
        include: srcFolder,
        options: {
          attrkey: 'attributes',
          childkey: 'children',
          explicitChildren: true,
          charsAsChildren: true
        }
      },
      {
        test: /\.jsx$/,
        include: srcFolder,
        loader: 'babel-loader',
        options: {
          "plugins": [
            ["babel-plugin-provide-modules", {
              "/jsx-pragma.js": ["h", "fragment"]
            }],
            ["@babel/plugin-transform-react-jsx", {
              "pragma": "h",
              "pragmaFrag": "fragment",
              "useBuiltIns": true
            }]
          ]
        }
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      inject: false
    })
  ]
}