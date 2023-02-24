module.exports = {
  "env": {
      "es6": true,
      node: true,
      jest: true,
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "project": "tsconfig.json",
      "sourceType": "module"
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  root: true,
  "rules": {
      "@typescript-eslint/indent": [
          "error",
          "tab"
      ],
      "@typescript-eslint/member-delimiter-style": [
          "error",
          {
              "multiline": {
                  "delimiter": "semi",
                  "requireLast": true
              },
              "singleline": {
                  "delimiter": "semi",
                  "requireLast": false
              }
          }
      ],
      "@typescript-eslint/prefer-namespace-keyword": "error",
      "@typescript-eslint/quotes": [
          "error",
          "double",
          {
              "avoidEscape": true
          }
      ],
      "@typescript-eslint/semi": [
          "error",
          "always"
      ],
      "@typescript-eslint/type-annotation-spacing": "error",
      "brace-style": [
          "error",
          "1tbs"
      ],
      "jsdoc/check-alignment": "error",
      "jsdoc/newline-after-description": "error",
      "no-trailing-spaces": "error",
      "no-var": "error",
      "prefer-const": "error",
      "spaced-comment": [
          "error",
          "always",
          {
              "markers": [
                  "/"
              ]
          }
      ]
  },
  "prettier/prettier": [
    "error",
    {},
    {
      "usePrettierrc": false
    }
  ]
};
