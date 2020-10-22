module.exports = {
  styles: {
    src: 'src/styles/index.css',
    dest: 'dist/styles'
  },
  scripts: {
    src: 'src/scripts/index.js',
    dest: 'dist/scripts'
  },
  assets: {
    src: 'src/assets/**/*.*',
    dest: 'dist/assets'
  },
  sharedAssets: {
    src: __dirname + '/' + '../../@shared/assets/**/*.*',
    dest: 'dist/assets'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  }
}
