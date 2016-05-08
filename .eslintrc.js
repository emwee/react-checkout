module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "semi": [2, "never"],
        "indent": [2, "tab", {"SwitchCase": 1}],
        "react/jsx-indent-props": [2, 'tab'],
        "react/jsx-no-bind": 0
    }
};