// Modules
const argv = require('yargs').argv;
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Environment type
 * BUILD is for generating minified builds
 * TEST is for generating test builds
 */
const BUILD = process.env.NODE_ENV === 'production';
const TEST = process.env.NODE_ENV === 'test';

const deps = [];

function makeWebpackConfig () {
  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  const config = {
    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    entry: {
      app: './src/main.js'
    },

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
    output: {
      // Absolute output directory
      path: __dirname + '/dist/',

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: BUILD ? '/' : 'http://localhost:3000/dist/',

      // Filename for entry points
      filename: '[name].bundle.js',

      // Filename for non-entry points
      chunkFilename: '[name].bundle.js'
    },

    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    devtool: 'cheap-source-map',

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    module: {
      noParse: [],
      preLoaders: [],
      loaders: [
        {
          // JS LOADER
          // Reference: https://github.com/babel/babel-loader
          // Transpile .js files using babel-loader
          // Compiles ES6 and ES7 into ES5 code
          test: /\.js$/,
          loaders: ['ng-annotate', 'babel?presets[]=es2015'],
          exclude: /node_modules/
        },
        {
          // ASSET LOADER
          // Reference: https://github.com/webpack/file-loader
          // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
          // Rename the file using the asset hash
          // Pass along the updated reference to your code
          // You can add here any file extension you want to get copied to your output
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file'
        },
        {
          // HTML LOADER
          // Reference: https://github.com/webpack/raw-loader
          // Allow loading html through js
          test: /\.html$/,
          loader: 'html'
        }
      ]
    },

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files
      // Disabled when in test mode or not in build mode
      new ExtractTextPlugin('[name].bundle.css', {
        disable: TEST
      }),

      // Reference: http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
      // Managing jquery dependencies
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        "window.$": "jquery"
      })
    ],

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    postcss: [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],

    resolve: {
      alias: {
        jquery: "jquery/src/jquery"
      }
    }
  };


  if (TEST) {
    config.entry = {};

    config.output = {};

    config.devtool = 'inline-source-map';

    if (argv.coverage) {
      // ISPARTA LOADER
      // Reference: https://github.com/ColCh/isparta-instrumenter-loader
      // Instrument JS files with Isparta for subsequent code coverage reporting
      // Skips node_modules and files that end with .test.js
      config.module.preLoaders.push({
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /\.test\.js$/
        ],
        loader: 'isparta-instrumenter'
      });
    }
  }

  if (BUILD) {
    config.devtool = 'source-map';

    config.plugins.unshift(
      new CleanPlugin('dist'),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),

      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin()
    );
  }

  if (!TEST && !BUILD) {
    // Add plugins for webpack-hot-middleware
    config.plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]);
  }

  // CSS LOADER
  // Reference: https://github.com/webpack/css-loader
  // Allow loading css through js
  //
  // Reference: https://github.com/postcss/postcss-loader
  // Postprocess your css with PostCSS plugins
  var cssLoader = {
    test: /\.css$/,
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files in production builds
    //
    // Reference: https://github.com/webpack/style-loader
    // Use style-loader in development for hot-loading
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
  };

  var lessLoader = {
    test: /\.less$/,
    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files in production builds
    //
    // Reference: https://github.com/webpack/style-loader
    // Use style-loader in development for hot-loading
    //
    // Reference: https://github.com/webpack/less-loader
    // Compile LESS files
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!less')
  };

  // Skip loading css in test mode
  if (TEST) {
    // Reference: https://github.com/webpack/null-loader
    // Return an empty module
    cssLoader.loader = 'null';
    lessLoader.loader = 'null';
  }
  else {
    // Skip rendering index.html in test mode
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: BUILD
        }
      })
    );
  }

  // Add cssLoader to the loader list
  config.module.loaders.push(cssLoader);

  // Add lessLoader to the loader list
  config.module.loaders.push(lessLoader);

  deps.forEach(function addVendor(dep) {
    config.resolve.alias[dep.name] = dep.path;
    config.module.noParse.push(new RegExp(dep.path));
  });

  return config;
}

module.exports = makeWebpackConfig();
