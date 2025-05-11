// export default {
//   printWidth: 120, // 单行最大字符数
//   indent: 2, // 缩进长度
//   tabWidth: 2, // 缩进空格数
//   useTabs: false, // 用空格代替 Tab
//   semi: true, // 行尾不加分号
//   singleQuote: true, // 使用单引号
//   quoteProps: 'as-needed', // 对象属性按需加引号
//   jsxSingleQuote: false, // JSX 中使用双引号
//   trailingComma: 'es5', // 尾逗号风格（ES5 兼容）
//   bracketSpacing: true, // 对象括号内加空格（如 { a: 1 }）
//   arrowParens: 'always', // 箭头函数单参数时强制加括号（如 (x) => x）
//   vueIndentScriptAndStyle: false, // Vue 文件中 script/style 内容不额外缩进
//   endOfLine: 'lf', // 统一换行符为 LF（兼容 Git）
// };

export default {
  printWidth: 80, // 每行代码长度（默认80）
  indent: 4, // 缩进长度
  tabWidth: 4, // 缩进空格数
  useTabs: false, // 不使用缩进符，而使用空格
  semi: false, // 行尾不加分号
  singleQuote: true, // 使用单引号
  quoteProps: "as-needed", // 对象属性按需加引号
  jsxSingleQuote: false, // JSX 不使用单引号，而使用双引号
  trailingComma: "es5", // 最后一个对象元素加逗号
  bracketSpacing: true, // 对象，数组加空格
  bracketSameLine: false, // HTML 标签闭合括号不另起一行
  arrowParens: "always", // 箭头函数单参数时强制加括号（如 (x) => x）
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  proseWrap: "preserve", // 按照文件原样折行
  htmlWhitespaceSensitivity: "css", // 根据显示样式决定 html 要不要折行
  vueIndentScriptAndStyle: false, // Vue 文件中的 script 和 style 内代码不缩进
  endOfLine: "lf", // 换行符使用 lf
};
