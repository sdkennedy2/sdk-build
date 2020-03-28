module.exports = {
  createPresetEnv({modules, targets}) {
    return [
      '@babel/preset-env',
      {
        modules,
        corejs: {
          version: 3,
          proposals: true,
        },
        useBuiltIns: 'usage',
        targets,
      },
    ];
  },
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'macros',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-class-properties',
    ['transform-inline-environment-variables', {include: ['DEBUG']}],
  ],
};
