const {createPresetEnv, baseConfig} = require('./babel.common');
module.exports = (api) => {
  if (api && api.cache) {
    api.cache(true);
  }
  return {
    ...baseConfig,
    presets: [
      ...baseConfig.presets,
      createPresetEnv({
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        },
      }),
    ],
  };
};
