const gulp = require('gulp');
const onStreamError = require('../lib/on-stream-error');
const paths = require('../lib/paths');
const postcss = require('gulp-postcss');
const minify = require('gulp-minify');

// Build CSS
gulp
  .src(paths.styles.src)
  .pipe(postcss([require('autoprefixer')]))
  .on('error', onStreamError)
  .pipe(gulp.dest(paths.styles.dest));

// Build JS
gulp
  .src(paths.scripts.src, { allowEmpty: true })
  .pipe(minify({noSource: true}))
  .on('error', onStreamError)
  .pipe(gulp.dest(paths.scripts.dest));

//Build HTML
gulp
  .src('src/*.html')
  .on('error', onStreamError)
  .pipe(gulp.dest('dist/'));
