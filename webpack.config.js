const path = require('path');

module.exports = {
  entry: [ 
    './src/weather.js',
    './src/local-storage.js'
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
     { test: /\.css$/,
       exclude: /node_modules/,
       use: [
         { loader: 'style-loader' },
         { loader: 'css-loader' }
       ]
      }
    ]
  },
};