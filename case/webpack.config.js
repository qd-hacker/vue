const path = require('path')
// 1. 导入 在内存中生成页面的webpack插件
const htmlWebpackPlugin = require('html-webpack-plugin')

// 使用Node语法，向外暴露配置对象，从而，让webpack运行的时候，加载指定的配置
// 为什么可以使用Node语法？因为 webpack 这个工具，就是基于node构建的；
module.exports = {
  entry: path.join(__dirname, './src/main.js'), // 项目的入口文件
  output: {
    path: path.join(__dirname, './dist'), // 输出路径
    filename: 'bundle.js' // 输出文件名
  }, // 打包好的文件的数据配置_
  plugins: [ // 插件配置节点
    new htmlWebpackPlugin({ // 创建一个 htmlWebpackPlugin 的实例对象
      template: path.join(__dirname, './src/index.html'), // 指定模板页面路径
      filename: 'index.html' // 指定内存中生成的HTMl文件名称
    })
  ],
  module: { // 用来配置 非JS文件对应的loader的
    rules: [ // 就是这些 非 JS 文件 和 loader 之间的对应关系
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, 
      {test:/\.less$/,use:['style-loader', 'css-loader','less-loader']},
      {test:/\.scss$/,use:['style-loader', 'css-loader','sass-loader']},
      { test: /\.jpg|png|gif|bmp$/, use: 'url-loader?limit=7636'},
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}