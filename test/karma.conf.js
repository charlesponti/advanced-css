'use strict';

module.exports = function(config) {
  config.set({

    basePath: '../',
    
    browsers: [
      'Chrome'
    ],

    frameworks: [
      'browserify',
      'jasmine'
    ],

    files: [
      'test/**/*spec.js'
    ],

    preprocessors: {
      'test/**/*spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      extensions: ['.js']
    },

    plugins: [
      'karma-jasmine',
      'karma-browserify',
      'karma-chrome-launcher'
    ]

  });
};
