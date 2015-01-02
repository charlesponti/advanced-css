'use strict';

// Development versions are default
global.isProd = false;

var runSequence = require('run-sequence');

// Gulp & Plugins
var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var minifyHTML = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');

// Styles
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');

// Scripts
var jshint = require('gulp-jshint');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var ngannotate = require('browserify-ngannotate');

// Testing
var karma = require('karma');
var protractor = require('gulp-protractor').protractor;
var webdriver = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;

// Dev Server
var port = 4000;
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

var files = {
  scripts: {
    main: './src/scripts/main.js',
    source: 'src/scripts/**/*.js',
    build: 'build/scripts'
  },
  styles: {
    main: './src/styles/main.scss',
    source: 'src/styles/**/*.scss',
    build: 'build/styles'
  },
  html: {
    source: 'src/**/*.html',
    build: 'build/'
  }
};

gulp.task('jshint', function() {
  return gulp.src(files.scripts.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['jshint'], function() {
  return browserify({
      entries: [files.scripts.main],
      debug: global.isProd ? true : false,
      insertGlobals: true,
      transform: ngannotate
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(files.scripts.build))
    .pipe(buffer())
    .pipe(gulpif(global.isProd, streamify(uglify())))
    .pipe(gulp.dest(files.scripts.build));
});

gulp.task('styles', function() {
  return gulp.src(files.styles.main)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(gulp.dest(files.styles.build))
    .pipe(gulpif(global.isProd, minifycss()))
    .pipe(gulp.dest(files.styles.build));
});

gulp.task('views', function() {
  gulp.src('src/index.html')
      .pipe(minifyHTML({
        comments: global.isProd ? false : true,
        spare: global.isProd ? false : true,
        empty: true
      }))
      .pipe(gulp.dest(files.html.build))
      .pipe(reload({ stream: true }));

  return gulp.src('./src/views/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('./src/scripts'));
});

gulp.task('test', function(done) {
  return karma.server.start({
    configFile: __dirname + '/karma.conf.js'
  }, done);
});

gulp.task('protractor', ['webdriver-update', 'webdriver' ], function() {
  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
        configFile: './protractor.conf.js',
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('watch', function() {
  gulp.watch(files.html.source, ['views']);
  gulp.watch(files.scripts.source, ['scripts']);
  return gulp.watch(files.styles.source, ['styles']);
});

gulp.task('server', function() {
  return browserSync({
    files: [
      './build/scripts/**/*.js',
      './build/styles/**/*.css',
      './build/**/*.html'
    ],
    server: {
      baseDir: './build',
      middleware: [historyApiFallback]
    },
    port: port
  });
});

gulp.task('prod', function() {
  global.isProd = true;
  return runSequence('views', 'styles', 'scripts');
});

gulp.task('build', function() {
  return runSequence('views', 'styles', 'scripts');
});

gulp.task('default', function() {
  return runSequence('build', 'watch', 'server');
});
