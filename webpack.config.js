var webpack = require('webpack');
var path = require('path');

const config = {
   entry: {
     main: path.join(__dirname+'/src/client/index.js')
   },
   output: {
     filename: 'bundle.js',
     path: path.join(__dirname+'/build'),
   },
   module: {
    rules: [
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015'] // Transpiles JSX and ES6
         }
       }]
     }
    ],

  }
};

module.exports = config;