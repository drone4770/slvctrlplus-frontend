/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  },
  "overrides": [
    {
      "files": [
        "cypress/integration/**.spec.{js,ts,jsx,tsx}"
      ],
      "extends": [
        "plugin:cypress/recommended"
      ]
    }
  ],
  "rules": {
    "max-len": [
      "error",
      {
        "code": 120,
        "tabWidth": 2,
        "ignoreComments": true, //"comments": 80
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
  }
}
