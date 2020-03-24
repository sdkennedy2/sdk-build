module.exports = {
  createPresetEnv({modules, targets}) {
    return [
      '@babel/preset-env',
      {
        modules: options.modules,
        corejs: {
          version: 3,
          proposals: true,
        },
        useBuiltIns: 'usage',
        targets: options.targets,
      },
    ];
  },
  presets: [
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    'macros',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-class-properties',
    ['transform-inline-environment-variables', {include: ['DEBUG']}],
  ]
};