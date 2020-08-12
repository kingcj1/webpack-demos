/**
 * 必须使用CommonJs规范
 * 更多高级用法：https://www.webpackjs.com/concepts/output/
 */

const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: "./app.js"
  },
  output: {
    publicPath: __dirname + "/dist/", // js引用路径或者CDN地址
    path: path.resolve(__dirname, "dist"), // 打包文件的输出目录
    filename: '[name].[hash].js'
  },
  plugins: [    
    new CleanWebpackPlugin()  
]
};
