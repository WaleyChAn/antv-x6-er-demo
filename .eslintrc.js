// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: [
    'vue'
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    process: true
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //debugger
    'no-console': 'off', // 取消打印报错
    'vue/max-attributes-per-line': 'off', //每行最大属性 
    'vue/attributes-order': 'error', //属性排序
    'vue/singleline-html-element-content-newline': 'off', //内容在新行
    'vue/multiline-html-element-content-newline': 'off', //内容在新行
    'vue/html-closing-bracket-newline': 'off', //结束符在新行
    'vue/html-self-closing': 'off', //强制自闭合
    'vue/attribute-hyphenation': 'off' //属性连字
  }
}
