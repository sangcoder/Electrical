const path = require('path')
const pkg = require('../../package')
const BASE = process.env.PWD || process.cwd()
module.exports = {
  root: {
    base: BASE,
    src: 'src',
    dest: 'public',
    deploy: 'deploy'
  },
  html: {
    src: 'html',
    pattern: '*.html',
    dest: './',
    data: 'data'
  },
  fonts: {
    src: 'fonts',
    pattern: '**/*',
    dest: 'fonts'
  },
  images: {
    src: 'images',
    pattern: '**/*',
    dest: 'images'
  },
  styles: {
    src: 'stylesheets',
    pattern: '**/*.scss',
    exclude: '**/_*.scss',
    dest: 'stylesheets',
    output: 'app.css'
  },
  scripts: {
    src: 'javascripts',
    entry: 'app.js',
    pattern: '**/*.js',
    dest: 'javascripts',
    output: 'app.js'
  },
  assets: {
    src: 'static',
    pattern: '**/*.*',
    dest: './'
  },
  worker: {
    src: 'worker',
    pattern: '**/*.*',
    dest: './'
  },
  install: {
    styles: {
      dest: 'modules'
    },
    scripts: {
      dest: 'modules'
    },
    images: {
      dest: 'images'
    }
  }
}
