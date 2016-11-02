var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;
var config = {
  entry: {
    app: ["./_source/ts/ndoo_prep.ts", "file?name=index.html!jade-html!./_source/ts/index.jade"],
    ndoo_prep: ["./_source/ts/ndoo_prep.ts"],
    ndoo: ["./_source/ts/ndoo.ts"],
    "ndoo.min": ["./_source/ts/ndoo.ts"]
  },
  output: {
    filename: "./tsoutput/[name].js",
    library: "ndoo",
    libraryTarget: "umd"
  },
  devtool: "source-map",

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
      minimize: true
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
}
else {

}
module.exports = config;