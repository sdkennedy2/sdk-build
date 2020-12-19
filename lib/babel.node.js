const {createPresetEnv, presets, plugins} = require('./babel.common');
module.exports = (api) => {
  if (api && api.cache) {
    api.cache(true);
  }
  return {
    ...baseConfig,
    presets: [
      ...baseConfig.presets,
      createPresetEnv({
        targets: {
          node: 'current',
        },
      }),
    ],
    sourceMaps: 'both',
  };
};
