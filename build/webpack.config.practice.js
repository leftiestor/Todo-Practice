
//import * as webpack from "webpack";

const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//合并webpack配置
const {merge} = require('webpack-merge');


const baseConfig = require('./webpack.config.base.js');

//环境切换

const devServer = {
  port: 8080,
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
      NOW_ENV:'"development"'
    }
  }),
  new HTMLPlugin({
    template:path.join(__dirname,'template.html')
  })
];


  // 开发环境
  //config.devtool = '#cheap-module-eval-source-map';
  config = merge(baseConfig, {
    entry: path.join(__dirname,'../practice/instance/index.js'),
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
    resolve:{
      //import Vue from 'vue'
      alias:{
        'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
      }
    },
    plugins:defaultPlugin.concat([
      new webpack.HotModuleReplacementPlugin(),
      //new webpack.NoEmitOnErrorsPlugin()
    ])
  });



module.exports = config;
