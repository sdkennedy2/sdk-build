const {createPresetEnv, presets, plugins} = require('./babel.common');
module.exports = (api) => {
  if (api && api.cache) {
    api.cache(true);
  }
  return {
    presets: [
      ...presets,
      createPresetEnv({
        targets: {
          node: 'current',
        },
      }),
    ],
    plugins,
  };
};
