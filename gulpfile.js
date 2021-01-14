const { task, watch, series } = require('gulp')
const pug = require('./build/pug')
const styles = require('./build/styles')
const browserSync = require('browser-sync').create()
const config = require('./build/config')

const taskWatch = (cb) => series('default', () => {
  const watcher = watch(['./src/**'], series('default'))
  cb && cb(watcher)
})

task('default', series(styles, pug))
task('serve', taskWatch((watcher) => {
  browserSync.init({
    server: {
      baseDir: config.dist.root
    }
  })
  watcher.on('change', browserSync.reload)
}))
task('watch', taskWatch())
