
//import * as webpack from "webpack";

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
//非JS文件打包成一个文件
const ExtractPlugin = require('extract-text-webpack-plugin');
//环境切换
const isDev = process.env.NOW_ENV === 'development';

const config = {
    target: "web",
    entry:path.join(__dirname, 'client/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path:path.join(__dirname, 'dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader','stylus-loader']
            },
            {
                test:/\.(gig|jpg|jpeg|png|svg)$/,
                use:[{
                    loader: "url-loader",
                    options:{
                        limit:1024,
                        name:'[name]-lvwen.[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[

        new webpack.DefinePlugin({
            'process.env':{
                NOW_ENV: isDev ? '"development"':'"production"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
};


config.devtool = isDev? false: '#cheap-module-eval-source-map';
if(isDev){
   // 开发环境
    config.module.rules.push({
        test:/\.styl$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader: "postcss-loader",
                options:{ sourceMap:true }
            },
            'stylus-loader'
        ]
    });
    config.devServer = {
        port: 9000,
        host: '0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true,
        inline: true,
        contentBase: path.join(__dirname, "public"),
        compress: true,
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry = {
        app: path.join(__dirname, 'client/index.js'),
        vendor: ['vue']
    }
    config.output.filename= '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test:/\.styl$/,
            use:ExtractPlugin.extract({
                fallback: 'style-loader',
                use:[
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options:{ sourceMap:true }
                    },
                    'stylus-loader'
                ]
            })
        }
    );
    config.plugins.push(
        new ExtractPlugin({
            //webPack 升级到 4.x导致
            // extract-text-webpack-plugin 无法使用
            // 从 .js 文件中提取出来的 .css 文件的名称
            // 因为webpack4.x包含了contentash这个关键字段，所以在ExtractPlugin中不能使用contenthash
            // 使用md5:contenthash:hex:8替代
            filename: `[name]_[md5:contenthash:hex:8].css`
        })
    );
    config.optimization ={
        splitChunks: {
            cacheGroups:{
                commons: {
                    name: "vendor",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    };
}


module.exports = config;