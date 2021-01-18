'use strict'; // eslint-disable-line

const {default: ImageminPlugin} = require('imagemin-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob-all');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const config = require('./config');

function collectSafelist() {
  return {
    standard: [
      /* WP classes */
      'rtl',
      'home',
      'blog',
      'archive',
      'date',
      'error404',
      'logged-in',
      'admin-bar',
      'no-customize-support',
      'custom-background',
      'wp-custom-logo',
      'alignnone',
      'alignright',
      'alignleft',
      'wp-caption',
      'wp-caption-text',
      'screen-reader-text',
      'comment-list',
      'wp-social-link',
      /^search(-.*)?$/,
      /^(.*)-template(-.*)?$/,
      /^(.*)?-?single(-.*)?$/,
      /^postid-(.*)?$/,
      /^attachmentid-(.*)?$/,
      /^attachment(-.*)?$/,
      /^page(-.*)?$/,
      /^(post-type-)?archive(-.*)?$/,
      /^author(-.*)?$/,
      /^category(-.*)?$/,
      /^tag(-.*)?$/,
      /^tax-(.*)?$/,
      /^term-(.*)?$/,
      /^(.*)?-?paged(-.*)?$/,
      /^wp-block-(.*)?$/,
      /^has-(.*)?$/,
      /^is-(.*)?$/,
      /^wp-embed-(.*)?$/,
      /^blocks-gallery-(.*)?$/,
      /* Swiper classes */
      /^swiper-/,
      /* Our classes */
      'scrolled-down',
      'show-nav',
    ],
  }
}

module.exports = {
  plugins: [
    new ImageminPlugin({
      optipng: { optimizationLevel: 2 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: {
        plugins: [
          { removeUnknownsAndDefaults: false },
          { cleanupIDs: false },
          { removeViewBox: false },
        ],
      },
      plugins: [imageminMozjpeg({ quality: 75 })],
      disable: (config.enabled.watcher),
    }),
    // uncomment this block to use PurgeCSS webpack plugin
    /* new PurgecssPlugin({
      paths: glob.sync([
        'app/!**!/!*.php',
        'resources/views/!**!/!*.php',
        'resources/assets/scripts/!**!/!*.js',
      ]),
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:\/]+/g) || [],
      safelist: collectSafelist,
    }),*/
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
