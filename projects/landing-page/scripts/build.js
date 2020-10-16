const gulp = require('gulp');
const onStreamError = require('../lib/on-stream-error');
const paths = require('../lib/paths');
const postcss = require('gulp-postcss');
const minify = require('gulp-minify');

const processors = [
  require('postcss-import'),              // combine imports into one file
  require('postcss-custom-properties'),   // replace variables by their calculated values
  require('postcss-color-function'),      // replaces color functions with rgba values
  require('postcss-color-rgba-fallback'), // adds a hex value before every rgba value
  require('pixrem'),                      // adds pixel fallback before every rem value
  require('postcss-calc'),                // pre-calculcates calc functions where possible
  require('autoprefixer')                 // vendor prefix for older browsers
];

// Build CSS
gulp
  .src(paths.styles.src)
  .pipe(postcss(processors))
  .on('error', onStreamError)
  .pipe(gulp.dest(paths.styles.dest));

// Build JS
gulp
  .src(paths.scripts.src, { allowEmpty: true })
  .pipe(minify({noSource: true}))
  .on('error', onStreamError)
  .pipe(gulp.dest(paths.scripts.dest));

//Build assets
gulp
  .src(paths.assets.src)
  .on('error', onStreamError)
  .pipe(gulp.dest(paths.assets.dest));

//Build HTML
gulp
  .src('src/*.html')
  .on('error', onStreamError)
  .pipe(gulp.dest('dist/'));
