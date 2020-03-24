const {createPresetEnv, presets, plugins} = require('./babel.common');
module.exports = function() {
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