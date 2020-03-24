const {createPresetEnv, presets, plugins} = require('./babel.common');
module.exports = function() {
  return {
    presets: [
      ...presets,
      createPresetEnv({
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        }
      }),
    ],
    plugins,
  };
};
