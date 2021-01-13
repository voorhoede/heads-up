const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const cssImport = require('gulp-cssimport');
const minifyCss = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

const SOURCE_DIR = 'src';
const PUBLISH_DIR = 'dist';

// Get all preview directories to loop over
const isDirectory = parentDir => el => lstatSync(join(parentDir, el)).isDirectory();
const previewDirs = readdirSync(SOURCE_DIR).filter(isDirectory(SOURCE_DIR));

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
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.js`)
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
  .src(`${ SOURCE_DIR }/**/!(*.html|*.css|*.js)`)
  .pipe(gulp.dest(PUBLISH_DIR))
;

// Run: Build
const runBuild = gulp.series(
  cleanDist,
  gulp.parallel(processCss, processJs, processHtml),
  copyLocalAssets
);

gulp.task('run:build', runBuild);
