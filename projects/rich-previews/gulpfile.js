const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const cssImport = require('gulp-cssimport');
const minifyCss = require('gulp-csso');
const uglify = require('gulp-uglify');

const SOURCE_DIR = 'src';
const PUBLISH_DIR = 'dist';

// Get all preview directories to loop over
const isDirectory = parentDir => el => lstatSync(join(parentDir, el)).isDirectory();
const previewDirs = readdirSync(SOURCE_DIR).filter(isDirectory(SOURCE_DIR));
console.log(previewDirs);

// Process CSS
const processCss = () => merge(
  previewDirs.map(dir =>
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.css`)
      .pipe(cssImport({}))
      .pipe(minifyCss())
      .pipe(gulp.dest(join(PUBLISH_DIR, dir)))
  )
);

// Process JavaScript
const processJs = () => merge(
  previewDirs.map(dir =>
    gulp.src(`${ SOURCE_DIR }/${ dir }/**/*.js`)
      .pipe(uglify())
      .pipe(gulp.dest(join(PUBLISH_DIR, dir)))
  )
);

// Process HTML



const cleanDist = () => del([ PUBLISH_DIR ]);

const runBuild = gulp.series(
  cleanDist,
  gulp.parallel(processCss, processJs)
);

gulp.task('run:build', runBuild);
