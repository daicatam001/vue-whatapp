module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        "plugin:vue/base",
        "plugin:vue/vue3-essential",
        "plugin:vue/vue3-strongly-recommended",
        "plugin:vue/vue3-recommended",
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
        "prettier"
    ],
    rules: {
        "no-mixed-spaces-and-tabs": 0,
        "vue/require-prop-types": 0,
        "vue/script-indent": ["error", 2, {"baseIndent": 0}],
        "vue/html-indent": ["error", 2, {
            "attribute": 2,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }]
    }
};