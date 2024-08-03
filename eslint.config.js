const pluginPrettier = require("eslint-plugin-prettier/recommended");

module.exports = [
    pluginPrettier,
    {
        rules: {
            "no-console": "warn",
            "no-unused-vars": "error",
        },
    },
];
