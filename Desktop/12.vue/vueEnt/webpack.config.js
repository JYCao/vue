const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports={
    entry: './src/main.js',
    devServer: {
        host: '127.0.0.1',  // 配置启动ip地址
        port: 10088,  // 配置端口
        open: true  // 配置是否自动打开浏览器
    },
    module:{
        rules:[
            {
                // 如果是.vue文件，使用如下的loader
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({ // 打包输出HTML
            minify: { // 压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符与换行符
              minifyCSS: true// 压缩内联css
            },
            filename: 'index.html',
            template: path.resolve('./public/index.html') // 指定模块的位置
        }),
        new VueLoaderPlugin()
    ],
}