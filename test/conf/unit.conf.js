// Karma configuration
// Generated on Tue Jul 21 2015 10:34:37 GMT+0800 (中国标准时间)
//
var contentPath = '../../../src/HZ.HworldPortal.Hotels/HZ.HworldPortal.Hotels/Content';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins : ['karma-jasmine', 'karma-chrome-launcher', 'karma-phantomjs-launcher', 'karma-coffee-preprocessor'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../**/*.coffee': ['coffee'],
      '**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler 
      options: {
        bare: false,
        sourceMap: false
      },
      // transforming the filenames 
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },


    // list of files / patterns to load in the browser
    files: [
      contentPath + '/lib/ndoo/ndoo_prep.js',
      contentPath + '/lib/backbone/underscore-min.js',
      contentPath + '/lib/ndoo/ndoo_lib.js',
      '../mock/jquery.mock.js',
      contentPath + '/lib/ndoo/ndoo.js',
      '../unit/*Spec.coffee'
    ],


    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
/* vim: se sw=2 ts=2 sts=2 fdm=marker et: */
