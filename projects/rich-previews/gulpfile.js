const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const cssImport = require('gulp-cssimport');
const minifyCss = require('gulp-csso');
const tap = require('gulp-tap');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('gulp-buffer');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const SOURCE_DIR = 'src';
const PUBLISH_DIR = 'dist';
const ASSETS_DIR = '@assets';

// Get all preview directories to loop over
const isValidDirectory = parentDir => dir => lstatSync(join(parentDir, dir)).isDirectory() && dir !== ASSETS_DIR;
const previewDirs = readdirSync(SOURCE_DIR).filter(isDirectory(SOURCE_DIR));	const previewDirs = readdirSync(SOURCE_DIR).filter(isValidDirectory(SOURCE_DIR));

// Task: Clean publish directory
const cleanDist = () => del([ PUBLISH_DIR ]);

// Task: Process CSS
const processCss = () => merge(
  previewDirs.map(dir =>
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.css`)
      .pipe(cssImport({}))
      .pipe(minifyCss())
      .pipe(gulp.dest(join(PUBLISH_DIR, dir)))
  )
);

// Task: Process JavaScript
const processJs = () => merge(
  previewDirs.map(dir =>
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.js`, { read: false })
      .pipe(tap(file => {
        file.contents = browserify(file.path, {
          debug: true,
          transform: [ babelify.configure({ presets: [ '@babel/preset-env' ] }) ],
        }).bundle();
      }))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(join(PUBLISH_DIR, dir)))
  )
);

// Task: Process HTML
const processHtml = () => merge(
  previewDirs.map(dir =>
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.html`)
      .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
      }))
      .pipe(gulp.dest(join(PUBLISH_DIR, dir)))
  )
);

// Task: Copy files
const copyLocalAssets = () => gulp
  .src(`${ SOURCE_DIR }/**/!(${ ASSETS_DIR })/!(*.html|*.css|*.js)`)
  .pipe(gulp.dest(PUBLISH_DIR))
;

const copyGlobalAssets = () => gulp
  .src(`${ SOURCE_DIR }/${ ASSETS_DIR }/**/*`)
  .pipe(gulp.dest(`${ PUBLISH_DIR }/${ ASSETS_DIR }`))
;

// Run: Build
const runBuild = gulp.series(
  cleanDist,
  gulp.parallel(processCss, processJs, processHtml),
  copyLocalAssets,
  copyGlobalAssets
);

gulp.task('run:build', runBuild);
