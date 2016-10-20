module.exports = {
  entry: {
    app: ["./_source/ts/ndoo_prep.ts", "file?name=index.html!jade-html!./_source/ts/index.jade"],
    ndoo_prep: ["./_source/ts/ndoo_prep.ts"],
    ndoo_slim: ["./_source/ts/ndoo_slim.ts"],
    ndoo_all: ["./_source/ts/ndoo_all.ts"]
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
  externals: {
    "underscore": "_",
    "backbone": "Backbone",
    "$": "this.jQuery || this.Zepto"
  },
};