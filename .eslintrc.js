module.exports = {
  root: true,

  env: {
    node: true
  },

  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],

  parserOptions: {
    parser: '@babel/eslint-parser'
  },

  rules: {
    // Solo se permiten console.warn/console.error (diagnóstico intencional);
    // cualquier console.log suelto se marca siempre, no solo en build de producción.
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
