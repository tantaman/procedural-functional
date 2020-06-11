module.exports = api => {
  const isTest = api.env('test');

  if (isTest) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        ['@babel/preset-flow'],
      ],
    };
  }

  return {
    presets: ['@babel/preset-env', '@babel/preset-flow'],
  };
};
