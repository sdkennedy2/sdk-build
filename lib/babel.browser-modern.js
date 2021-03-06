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
          browsers: [
            'last 2 Chrome versions',
            'not Chrome < 60',
            'last 2 Safari versions',
            'not Safari < 10.1',
            'last 2 iOS versions',
            'not iOS < 10.3',
            'last 2 Firefox versions',
            'not Firefox < 54',
            'last 2 Edge versions',
            'not Edge < 15',
          ],
        },
      }),
    ],
  };
};
