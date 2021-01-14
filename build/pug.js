const { src, dest } = require('gulp')
const fs = require('fs')
const pug = require('gulp-pug')
const replace = require('gulp-replace')
const inlineCSS = require('gulp-inline-css')
const config = require('./config')

module.exports = () => src(`${config.src.templates}/**/*.pug`)
  .pipe(pug({
    pretty: true
  }))
  .pipe(
    replace('<style type="text/css"></style>', () => {
      const css = fs.readFileSync(`${config.dist.styles.replace('./','')}/index.css`, "utf8");

      return `<style type="text/css">\n${css}\n</style>`;
    })
  )
  .pipe(inlineCSS({
    preserveMediaQueries: true,
    removeStyleTags: true,
  }))
  .pipe(dest(config.dist.root))