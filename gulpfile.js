'use strict';

var gulp = require('gulp');
var webpack = require('webpack');
var plugins = require('gulp-load-plugins')();
var scripts = {
      main: 'js/main.js',
      src: 'src/**/*.js',
      dest: 'js'
    };
var styles = {
      src: 'src/styles/*.scss',
      dest: 'css'
    };
var html = {
      jade: 'src/views/*.jade',
      src: 'src/views/index.jade',
      dest: './'
    };

gulp.task('webpack', function(callback) {
  webpack({
    entry: './src/viewmodels/index.js',
    output: {
      filename: scripts.main
    },
    externals: {
      'vue': 'window.Vue'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    }
  }, function(err, stats) {
    if(err) {
      throw new plugins.util.PluginError('webpack', err);
    }

    plugins.util.log('[webpack]', stats.toString());

    callback();
  });
});

gulp.task('js', ['webpack'], function() {
  return gulp.src(scripts.main)
    .pipe(plugins.eslint())
    .pipe(plugins.uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
  return gulp.src(styles.src)
    .pipe(plugins.sass())
    .pipe(gulp.dest('css'));
});

gulp.task('css', function() {
  return gulp.src(styles.src)
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'Edge >= 12',
        'Explorer >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 7.1'
      ]
    }))
    .pipe(gulp.dest('css'));
});

gulp.task('jade', function() {
  return gulp.src(html.src)
    .pipe(plugins.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('html', function() {
  return gulp.src(html.src)
    .pipe(plugins.jade())
    .pipe(gulp.dest('./'));
});

gulp.task('release', ['js', 'css', 'html']);

gulp.task('asset@js', function() {
  return gulp.src([
      'bower_components/material-design-lite/material.min.js',
      'bower_components/vue/dist/vue.min.js'
    ])
    .pipe(gulp.dest('js'));
});

gulp.task('asset@css', function() {
  return gulp.src([
      'bower_components/material-design-lite/material.min.css'
    ])
    .pipe(gulp.dest('css'));
});

gulp.task('asset@fonts', function() {
  return gulp.src([
      'bower_components/material-design-icons/iconfont/MaterialIcons*'
    ])
    .pipe(gulp.dest('fonts'));
});

gulp.task('asset', ['asset@js', 'asset@css', 'asset@fonts']);

gulp.task('watch', function () {
  gulp.watch(scripts.src, ['webpack']);
  gulp.watch(styles.src, ['sass']);
  gulp.watch(html.jade, ['jade']);
});

gulp.task('default', ['watch']);
