module.exports = {
  root: true,
  // parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es2020: true,
    browser: true,
    node: true,
    worker: true,
    serviceworker: true,
    mocha: true,
    jest: true,
  },
  plugins: ['svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    indent: 'off',
    semi: ['error', 'never'],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-unused-labels': 'off',
    'object-shorthand': ['error', 'always'],
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    // 'prefer-const': ['error', { destructuring: 'all' }],
    'no-inner-declarations': 'off',
    eqeqeq: ['error', 'smart'],
    'grouped-accessor-pairs': ['error', 'getBeforeSet'],
    'default-case-last': 'error',
    'no-alert': 'error',
    'no-constructor-return': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    // causing issues with svelte files
    // 'no-invalid-this': 'error',
    'no-self-compare': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
    ],
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-rest-params': 'error',
    // 'prefer-named-capture-group': 'error',
    'no-label-var': 'error',
    'no-useless-computed-key': 'error',
    'template-curly-spacing': ['error', 'never'],
    'require-atomic-updates': 'off',
  },
}
