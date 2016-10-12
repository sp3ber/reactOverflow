module.exports = {
  "plugins": [
    "react",
    "babel"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb"
  ],
  "parser": "babel-eslint",
  "globals": {
    "document": true,
    "window"  : true
  },
  "rules": {
    "max-len": ["error", 120],
    "quote-props": ["off"],
    "no-unused-vars": ["warn", "all"],
    "comma-dangle": ["error", "never"],
    "react/jsx-first-prop-new-line": ["off"],
    "react/jsx-closing-bracket-location": ["off"],
    "react/prefer-stateless-function": ["warn"],
    "react/jsx-filename-extension": ["off"],
    "react/forbid-prop-types": ["off"],
    "class-methods-use-this": ["off"],
    "no-unescaped-entities": ["off"],
    "arrow-parens": ["off"],
    "no-extra-boolean-cast": ["off"],
    "linebreak-style": "off"
  }
};
