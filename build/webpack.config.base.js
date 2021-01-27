
//import * as webpack from "webpack";

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const createVueLoaderOptions = require('./vue-loader.config.js');
//环境切换
const isDev = process.env.NOW_ENV === 'development';

const config = {
  mode: process.env.NOW_ENV || 'production',
  target: "web",
    entry:path.join(__dirname, '../client/index.js'),
    output: {
        filename: "bundle.[hash:8].js",
        path:path.join(__dirname, '../dist')
    },
    module:{
        rules:[
            {
                test: /\.(vue|js|jsx)$/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                use: [{
                    loader:'vue-loader',
                    options: createVueLoaderOptions(isDev)
                }]
            },
            {
                test: /\.jsx$/,
                loader:'babel-loader'
            },
            {
                test: /\.js$/,
                loader:'babel-loader',
                exclude: /node_modules/
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
                        name:'resources/[path][name]-[hash:8].[ext]'
                    }
                }]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ]
};




module.exports = config;
