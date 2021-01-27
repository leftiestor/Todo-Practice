
//import * as webpack from "webpack";

const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//合并webpack配置
const {merge} = require('webpack-merge');

//非JS文件打包成一个文件
const ExtractPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base.js');

//环境切换
const isDev = process.env.NOW_ENV === 'development';
const devServer = {
    port: 9000,
    host: '0.0.0.0',
    overlay:{
        errors:true
    },
    hot:true,
    // inline: true,
    // contentBase: path.join(__dirname, "public"),
    // compress: true,
};

const defaultPlugin = [
    new webpack.DefinePlugin({
        'process.env':{
            NOW_ENV: isDev ? '"development"':'"production"'
        }
    }),
    new HTMLPlugin()
];


let config ;

//config.devtool = isDev? false: '#cheap-module-eval-source-map';
if(isDev){
    // 开发环境
    //config.devtool = '#cheap-module-eval-source-map';
    config = merge(baseConfig, {
        devtool : '#cheap-module-eval-source-map',
        module:{
            rules:[
                {
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
                }

            ]
        },
        devServer,
        plugins:defaultPlugin.concat([
            new webpack.HotModuleReplacementPlugin(),
            //new webpack.NoEmitOnErrorsPlugin()
        ])
    });

}else{
    config= merge(baseConfig, {
        entry:{
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output:{
            filename: '[name].[chunkhash:8].js'
        },
        module:{
            rules:[
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
            ]
        },
        plugins:[
            new ExtractPlugin({
                //webPack 升级到 4.x导致
                // extract-text-webpack-plugin 无法使用
                // 从 .js 文件中提取出来的 .css 文件的名称
                // 因为webpack4.x包含了contentash这个关键字段，所以在ExtractPlugin中不能使用contenthash
                // 使用md5:contenthash:hex:8替代
                filename: `[name]_[md5:contenthash:hex:8].css`
            })
        ],
        optimization:{
            splitChunks: {
                cacheGroups:{
                    commons: {
                        name: "vendor",
                        chunks: "initial",
                        minChunks: 2
                    }
                }
            }
        }
    });
}


module.exports = config;
