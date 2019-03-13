const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { isDev, isProd, isBackend, convertPathToUrl} = require('./lib/util')
const config = require('./config')

const webpackConfig = () => {
  const {root, theme, proxy} = config.getBackendConfig()
  const scripts = config.paths.scripts
  const wpConfig = {
    mode: 'none',
    entry: [
      path.join(config.getPathSrc('scripts'), scripts.entry)
    ],
    output: {
      filename: scripts.output,
      publicPath: convertPathToUrl(scripts.dest),
      path: config.getPathDest('scripts')
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: 'exports-loader?Util!bootstrap/js/dist/util',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
      })
    ],
    externals: {
      'settings': 'settings',
      'jquery': 'jQuery'
    },
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        config.getPathSrc('scripts'),
        path.resolve(config.getBase(), 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                require.resolve('babel-preset-env'),
                require.resolve('babel-preset-stage-1')
              ]
            }
          }
        }
      ]
    },
    context: config.getPathSrc('scripts'),
    resolveLoader: {
      modules: [
        'node_modules',
        config.getPathSrc('scripts')
      ]
    }

  }
  if (isDev()) {
    wpConfig.devtool = 'cheap-module-eval-source-map'
    wpConfig.entry.push('webpack-hot-middleware/client?&reload=true')
    wpConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  }
  if (isProd()) {
    wpConfig.devtool = 'source-map'
    wpConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        sourceMap: false
      }),
      new webpack.NoEmitOnErrorsPlugin()
    )
  }
  if (isBackend()) {
    wpConfig.output.publicPath = convertPathToUrl(path.join(theme, scripts.dest))
  }
  return wpConfig
}

module.exports = webpackConfig
