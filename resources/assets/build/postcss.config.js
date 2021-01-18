/* eslint-disable */

module.exports = (api) => {

  const cssnanoConfig = {
    preset: ['default', {discardComments: {removeAll: true}}]
  };

  return {
    parser: api.options.ctx.enabled.optimize ? 'postcss-safe-parser' : undefined,
    plugins: {
      'postcss-import': true,
      tailwindcss: `${api.options.ctx.paths.assets}/styles/tailwind.config.js`,
      'postcss-nesting': true,
      autoprefixer: true,
      cssnano: api.options.ctx.enabled.optimize ? cssnanoConfig : false,
    },
  };
};
