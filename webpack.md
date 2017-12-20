# Vue.js - Day4 - Webpack

## 为什么要学习webpack
1. 学习Webpack要帮我们压缩、合并常见的静态资源文件；
2. 处理文件的前后依赖关系；
 + webpack如何处理这些依赖关系；
 + webpack内部实现了模块化的机制；（实现模块化的方式，和 Node 中差不多，也是创建了一个模块包装器，把所有的代码都包装起来；）
3. webpack-dev-server：作用帮我们实现在开发阶段中的实时打包编译和刷新浏览器；
4. html-webpack-plugin：把HTML首页自动托管到内存中，自动把打包好的bundle.js路径，以 script 标签 注入到页面中；

## 在网页中会引用哪些常见的静态资源？
1. 样式表
 + .css   .less   .sass   .scss
2. Javascript脚本文件
 + .js    .ts   .coffee
3. 图片
 + .jpg   .gif   .png   .bmp
4. 字体文件（Fonts）
 + .eot   .svg   .ttf    .woff    .woff2
5. 模板文件
 + .ejs  .vue   .jade


## 网页中引入的静态资源多了以后有什么问题？？？
1. 加载慢：当静态资源多了以后，会发起很多的二次资源请求，这时候，我们的网页加载速度就慢了；
2. 会出现静态资源的前后依赖关系问题；


## 如何解决上述两个问题
1. 把 图片合并成精灵图、把 CSS 或 JS 合并、压缩 一下；
2. 把图片转为 base64 的编码格式；
3. 可以使用即将学到的webpack去解决静态资源的依赖问题；

 
## 什么是webpack?
+ webpack 是前端项目的构建工具，将来，我们开发的项目，如果想要提高维护性和可控制性的话，尽量选择 webpack 进行构建；
+ webpack 非常适合与单页面应用程序结合使用；不太适合与多页面的普通网站结合使用；
+ 项目中使用 webpack 有什么好处：
    - 能够处理静态资源的 依赖关系；
    - 能够优化项目代码，比如：压缩合并文件，把图片转为base64编码格式；
    - 能够把高级的语法转为低级的语法；
    - webpack 能够转换一些模板文件； .vue 
+ 根据官网的图片介绍webpack打包的过程
+ [webpack官网](http://webpack.github.io/)

## webpack安装的两种方式
1. 可以全局安装`webpack`, 运行 `cnpm i webpack -g`  全局安装一下webpack；
2. 也可以在项目中安装 webpack,  运行`cnpm i webpack -D` 安装到项目开发依赖即可；


## 初步使用webpack打包构建列表隔行变色案例
+ 直接运行全局的 webpack 指令进行打包构建：
```
    webpack   ./src/main.js   ./dist/bundle.js
```


## 使用webpack的配置文件简化打包时候的命令
1. 在项目中，新建一个配置文件叫做`webpack.config.js`
2. 在配置文件中，向外暴露一个配置对象，供webpack执行的时候来读取这个配置对象：
```
    const path = require('path')

    module.exports = {
        entry: path.join(__dirname, './src/main.js'), // 指定要处理那个文件
        output: { // 指定输出文件的存放路径
            path: path.join(__dirname, './dist'), // 路径
            filename: 'bundle.js' // 输出的文件名
        }
    }
```


## 实现webpack的实时打包构建
1. 每次修改完 项目代码，都需要手动运行一下 webpack 命令进行打包构建；比较麻烦
2. 可以在项目本地安装一个`webpack-dev-server`的工具来实现实时打包构建的效果；
3. 注意： `webpack-dev-server`这个工具，需要在项目本地安装，同时，它依赖于项目本地的`webpack`:
 + `cnpm i webpack webpack-dev-server -D`
4. 需要打开`package.json`这个配置文件，找到 `scripts` 节点，在其中，新增一个`dev`脚本命令：
```
  "scripts": {
    "dev": "webpack-dev-server"
  },
```
5. 只要在终端中，运行`npm run dev`命令，去执行 `dev`脚本，启动`webpack-dev-server`这个实时构建编译的服务器；
6. 注意：`webpack-dev-server`打包出来的 `bundle.js` 并没有存放到实际的物理磁盘，而是托管到了内存中！托管的路径是项目的根目录，所以，在引用的时候，script 标签的路径应该这样写：
```
    <script src="/bundle.js"></script>
```


## 使用`html-webpack-plugin`插件配置启动页面
1. 这个插件的作用：
 + 能够根据给定的页面路径，在内存中生成一个一模一样的页面；
 + 能够在内存中生成的页面中，自动把 打包好的 bundle.js 文件，注入为一个 script 标签！
2. 如何配置插件：先运行`cnpm i html-webpack-plugin -D`安装到本地开发依赖
3. 在`webpack.config.js`中，导入这个插件：
```
    const htmlWebpackPlugin = require('html-webpack-plugin')
```
4. 在`webpack.config.js`的配置对象中，新增一个 `plugins` 插件节点：
```
    plugins: [ // 插件的数组
        new htmlWebpackPlugin({ // 创建一个把HTML首页托管到内存中的插件
        template: path.join(__dirname, './src/index.html'), //  要把哪个HTML页面，作为模板，复制一份托管到内存中
        filename: 'index.html' // 指定，将来在内存中复制出来的页面，名称叫做 index.html
        })
    ]
```


## 实现自动打开浏览器、热更新和配置浏览器的默认端口号
**注意：热更新在JS中表现的不明显，可以从一会儿要讲到的CSS身上进行介绍说明！**
### 方式1：
直接在 `package.json`的`dev`脚本后，添加相关指令即可：
```
    "dev1": "webpack-dev-server --open --port 3000 --host 127.0.0.1 --hot"
```

### 方式2：(不推荐)
1. 需要先在 `webpack.config.js`中，添加`devServer` 选项：
```
    devServer: { // webpack-dev-server运行时候的指令， 这种配置方式和 -- 指令，只能二选一
        //  --open --port 3000 --host 127.0.0.1 --hot
        open: true, // 自动打开浏览器
        port: 3000, // 指定端口号
        host: '127.0.0.1', // 指定Ip地址
        hot: true // 启用热更新, 这里的 hot 指令，需要配合 一个 热更新的 webpack 插件才能正常使用
    }
```
2. 需要在头部导入`webpack`：
```
    // 导入webpack
    const webpack = require('webpack')
```
3. 在 `plugins`节点中，添加一个新的插件：
```
    new webpack.HotModuleReplacementPlugin()
```


## 使用webpack打包css文件
1. 运行`cnpm i style-loader css-loader -D`来安装处理 `.css` 文件的 第三方loader加载器
2. 在`webpack.config.js` 的配置对象中，添加一个 `module` 节点，并在 `module` 节点下，新增一个 `rules` 数组，表示非JS文件的匹配规则：
```
  module: { // 用来配置 非JS文件对应的loader的
    rules: [ // 就是这些 非 JS 文件 和 loader 之间的对应关系
      { test: /\.css$/, use: ['style-loader', 'css-loader'] } // 创建处理 css 文件的 loader 匹配规则
    ]
  }
```

## 使用webpack打包less文件
1. 运行`cnpm i  less-loader less -D` 安装相关的loader
2. 添加新的loader匹配规则：
```
 { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] } // 配置处理less文件的规则
```


## 使用webpack打包sass文件
1. 运行`cnpm i sass-loader node-sass -D`
2. 添加loader配置规则：
```
    { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置 处理 scss 文件的规则
```


## 使用webpack处理css中的路径
1. 运行`cnpm i url-loader file-loader -D`
2. 添加配置规则：
```
    { test: /\.jpg|png|gif|bmp$/, use: 'url-loader' } // 配置 处理 样式表中图片的 loader规则
```
3. 如果，配置规则中，只需要调用一个loader，则，可以把数组简化成一个 字符串；
4. 如果想要限制什么图片被转码，什么图片不被转码，这时候，可以为 url-loader 提供 `limit`配置参数；只有小于给定值的图片，才会被转码成base64；limit 的单位是`Byte字节`
5. url-loader还有第二个配置参数，叫做 `name`
 + [name]           表示原来的名字
 + [ext]               表示原后缀名
 + [hash:长度]     表示取Hash值的前几位（总长度是 32 位字符串）


## 使用babel处理高级JS语法
1. 安装两套`babel`相关的包：
 + 运行 `cnpm i babel-core babel-loader babel-plugin-transform-runtime -D`
 + 运行 `cnpm i babel-preset-env babel-preset-stage-0 -D`
2. 打开`webpack.config.js`配置文件，添加`babel`的loader配置项：
```
 // 添加转换JS文件的loader，
// 其中，必须把 node_modules 目录设置为 排除项，这样，在打包的时候，会忽略node_modules 目录下的所有JS文件；否则项目运行不起来！
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
3. 在项目的根目录中，创建一个`.babelrc`的配置文件，将来，`babel-loader`在执行的时候，会读取并使用这个配置文件：
```
    {
    "plugins": ["transform-runtime"],
    "presets": ["env", "stage-0"]
    }
```

## 相关文章
[babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)
[Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)