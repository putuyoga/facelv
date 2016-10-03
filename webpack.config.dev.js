var webpack = require('webpack');
var path = require('path');

var DIST_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'client');
var config = {
  entry: {
    app: [APP_DIR + '/index.js'],
    vendor: ['react', 'react-redux', 'redux', 'redux-thunk', 'react-dom', 'react-router', 'react-addons-css-transition-group']
  },
  output: {
    path: DIST_DIR,
    filename: 'app.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?$/,
        exclude: /node_module/,
        loader : 'babel'
      },
      {
        test: /\.css$/,
        
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }
    ]
  },
  resolve : {
      extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js'
    })
  ]
};

module.exports = config;