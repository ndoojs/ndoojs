var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var NODE_ENV = process.env.NODE_ENV;
var TARGET = process.env.TARGET;
var config = {
  entry: {
    ndoo_prep: ["./_source/ts/ndoo_prep.ts"],
    ndoo: ["./_source/ts/ndoo.ts"]
  },
  output: {
    filename: "./js/[name].js",
    library: "ndoo",
    libraryTarget: "umd"
  },
  devtool: "cheap-module-eval-source-map",

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.jade$/, loader: "jade-loader" }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new htmlWebpackPlugin({
      title: 'Typescript Preview Page',
      inject: false,
      template: __dirname + '/_source/ts/index.jade'
    }),
  ],
  externals: {
    "underscore": "_",
    "backbone": "Backbone",
    "jquery": "jQuery",
    "zepto": "Zepto",
  },
};

if (NODE_ENV == 'production') {
  config.devtool = 'source-map';
  config.plugins.splice(2);
  // config.plugins = config.plugins.slice(2);
}
if (TARGET == 'node') {
  config.entry = {
    "index": ["./_source/ts/export.ts"]
  };
  // delete config.externals;
  config.output =  {
    filename: "./[name].js",
    library: "ndoojs",
    libraryTarget: "umd"
  };
  // delete config.devtool;
  // delete config.externals;
}
else if (TARGET == 'dist') {
  delete config.entry['ndoo'];
  delete config.entry['ndoo_prep'];
  config.entry['ndoo.min'] = ["./_source/ts/ndoo.ts"];
  config.entry['ndoo_prep.min'] = ["./_source/ts/ndoo_prep.ts"];
  config.output.filename = './dist/[name].js';
}
module.exports = config;