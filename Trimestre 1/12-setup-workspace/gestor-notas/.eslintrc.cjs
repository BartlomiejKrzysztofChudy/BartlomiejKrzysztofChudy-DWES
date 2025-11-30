module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  plugins: ['ava'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true
      }
    ],
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.config.js',
          '**/*.config.cjs',
          '**/*.config.mjs'
        ]
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__dirname', '__filename']
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      extends: ['plugin:ava/recommended']
    }
  ]
};
