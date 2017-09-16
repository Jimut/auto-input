import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSyncBuilder from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const browserSync = browserSyncBuilder.create();
const { reload } = browserSync;

const configSource = require('./webpack.config.js');

gulp.task('html', () => {
  gulp.src([
    './src/index.html',
  ])
    .pipe(gulp.dest('./build'));
});

gulp.task('script', () => (
  gulp.src([
    './src/js/main.js',
  ])
    .pipe(webpackStream(configSource, webpack))
    .pipe(gulp.dest('./build/js'))
));

gulp.task('style', () => (
  gulp.src([
    './src/css/main.sass',
  ])
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('./build/css'))
));

gulp.task('clean', () => (
  del(['build/*'], {
    dot: true,
  })
));

const r = (d) => {
  reload();
  d();
};

gulp.task('watch:html', ['html'], r);

gulp.task('watch:style', ['style'], r);

gulp.task('watch:script', ['script'], r);

gulp.task('serve', ['html', 'script', 'style'], () => {
  browserSync.init({
    server: './build/',
  });

  gulp.watch('./src/index.html', ['watch:html']);
  gulp.watch('./src/css/main.sass', ['watch:style']);
  gulp.watch('./src/js/*.js', ['watch:script']);
});

gulp.task('default', ['clean'], cb => (
  runSequence(
    'html',
    'style',
    'script',
    cb,
  )
));
