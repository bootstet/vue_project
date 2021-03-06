//导入path 
var path = require('path')

//生成index.html，并且导入bundle.js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:'./src/main.js', //打包的入口文件
  output:{ //打包之后的输出文件
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.ttf$/,
                loader: 'url-loader'
            },
            {
                 test: /\.sass$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.scss$/,
               loader: 'style-loader!css-loader!sass-loader!scss-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/, 
                loader: 'file-loader?name=./images/[name].[ext]' 
            },
            // {
            //     test: /\.svg$/,
            //     loader: 'svg-sprite?' + JSON.stringify({
            //         name: '[name]_[hash]',
            //         prefixize: true
            //     })
            // }
        ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename : 'index.html', //最终在内存中生成的文件名称，并且这个文件会在浏览器中自动打开
        template : 'template.html' //生成index.html的参照模版
    })
  ]
}
