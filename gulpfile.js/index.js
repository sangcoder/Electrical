const gulp = require('gulp')
const path = require('path')
const requireDir = require('require-dir')
process.env.PWD = process.env.PWD || path.resolve(process.cwd())
const env = require('./lib/env')
requireDir('./tasks')
// default task is development task for html developer
gulp.task('default', gulp.series(
  // 'checkhooks',
  'clean',
   gulp.parallel('fonts', 'images', 'styles', 'assets', 'html'),
   gulp.parallel('server', 'watch')
))

// build template for html production
gulp.task('build', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('fonts', 'images', 'scripts', 'styles', 'assets', 'html', 'worker'),
  'sizereport'
))

// only build img
gulp.task('img', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('images'),
'sizereport'
))

// only build css
gulp.task('css', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('styles'),
'sizereport'
))

// only build js
gulp.task('js', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('scripts'),
'sizereport'
))

// build template for backend production
gulp.task('backend:build', gulp.series(
  'prebuild', // set production global variable
  env('backend'), // set backend global variable
  gulp.parallel('fonts', 'images', 'scripts', 'styles', 'assets', 'worker'),
  'sizereport'
))

// for backend developer
gulp.task('backend', gulp.series(
   // 'checkhooks',
   env('backend'), // set backend global variable
   gulp.parallel('fonts', 'images', 'styles', 'assets', 'worker'),
   // gulp.parallel('php'),
   gulp.parallel('server', 'watch')
))
// for backend developer
gulp.task('backend:php', gulp.series(
  // 'checkhooks',
  env('backend'), // set backend global variable
  gulp.parallel('fonts', 'images', 'styles', 'assets'),
  // gulp.parallel('php'),
  gulp.parallel('server', 'watch')
))
gulp.task('backend:critical', gulp.series(
  // 'checkhooks',
  env('backend'), // set backend global variable
  gulp.parallel('critical')
))
module.exports = gulp.task('default')
