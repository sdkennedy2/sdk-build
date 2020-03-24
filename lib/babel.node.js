const {createPresetEnv, presets, plugins} = require('./babel.common');
module.exports = () => ({
  presets: [
    ...presets,
    createPresetEnv({
      targets: {
        node: 'current',
      },
    }),
  ],
  plugins,
});
