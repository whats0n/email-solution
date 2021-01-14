const { src, dest } = require('gulp')
const sass = require('gulp-sass')
const gcmq = require('gulp-group-css-media-queries')
const config = require('./config')

sass.compiler = require('node-sass')

module.exports = () => src(`${config.src.styles}/**/*.scss`)
  .pipe(sass().on('error', sass.logError))
  .pipe(gcmq())
  .pipe(dest(config.dist.styles))