

const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const setMpa = () => {
  const entry = {};//入口对象
  const htmlWebpackPlugins = [];//html-webpack-plugin配置
  //获取入口文件
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

  Object.keys(entryFiles).map(index => {
    const entryFil = entryFiles[index];
    //获取文件夹名称
    const match = entryFil.match(/src\/(.*)\/index\.js/);
    const pathname = match && match[1];
    //配置入口文件对象
    entry[pathname] = entryFil;
    //配置html-webpack-plugin
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${pathname}/index.html`),
        filename: `${pathname}.html`,
        chunks: [pathname],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyJS: true,
          minifyCSS: true,
          removeComments: false
        }
      })
    )
  });

  return {
    entry,
    htmlWebpackPlugins
  }
};

const { entry, htmlWebpackPlugins } = setMpa();
module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:5].js'
  },
  mode: 'production',
  module: {
    rules: [
      // ...
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugins)
}