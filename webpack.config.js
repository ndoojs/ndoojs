var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;
var TARGET = process.env.TARGET;
var config = {
  entry: {
    app: ["./_source/ts/ndoo_prep.ts", "file?name=index.html!jade-html!./_source/ts/index.jade"],
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
      { test: /\.tsx?$/, loader: "ts-loader" }
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
    })
  ],
  externals: {
    "underscore": "_",
    "backbone": "Backbone",
    "jquery": "jQuery",
    "zepto": "Zepto",
  },
};

if (NODE_ENV == 'production') {
  delete config.entry['app'];
  config.devtool = 'source-map';
}
if (TARGET == 'node') {
  config.entry = {
    "index": ["./_source/ts/export.ts"]
  };
  config.output =  {
    filename: "./[name].js",
    library: "ndoojs",
    libraryTarget: "umd"
  };
  delete config.devtool;
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