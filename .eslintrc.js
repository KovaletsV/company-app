module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    semi: [2, "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
      },
    ],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never",
      },
    ],
    "spaced-comment": [1, "never", { markers: ["/"] }],
    "multiline-ternary": ["error", "always-multiline"],
    "comma-dangle": ["error", "only-multiline"],
  },
};
