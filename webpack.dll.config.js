var webpack = require('webpack');
var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');

var pkg = require("./package.json");

if ( process.env.NODE_ENV  === null ){
    console.log("--------------警告：process.env.NODE_ENV没有设置，默认使用development-------------------------");
}else{
    console.log(`--------------注意：process.env.NODE_ENV = ${process.env.NODE_ENV} -------------------------`);
}

var NODE_ENV = process.env.NODE_ENV || "development";
var __DEV__ = !(process.env.NODE_ENV === 'production');

/*
 开发环境推荐：
 cheap-module-eval-source-map
 生产环境推荐：
 cheap-module-source-map
 这也是下版本 webpack 使用 -d 命令启动 debug 模式时的默认选项
 */
var sourceMapType = __DEV__ ? 'cheap-module-eval-source-map' : "cheap-module-source-map";

var BUILD_OUTPUT = path.resolve(pkg.output ? pkg.output : './build');

var BUILD_PATH = (__DEV__ ? path.resolve(BUILD_OUTPUT + '/debug') : path.resolve(BUILD_OUTPUT + '/release')) + "/static";

module.exports = {
    entry: {
        vender: [//公共组件
            "assert",
            "events",
            "querystring",
            "stream",
            "util",
            "buffer",
            "q",
            "handlebars",
            "classnames",
            "prop-types",
            'react-dom',
            "react"
            /*
            'react',

            'react-router',
            'react-bootstrap',
            'redux',
            'react-redux',
            'redux-thunk',
            'react-intl',
            'intl',
            'react-dnd',
            'react-dnd-html5-backend',
            'immutable',
            'antd',
            'moment',
            'isomorphic-fetch',
            'pure-render-decorator',*/
            // 'lodash',
        ]
    },
    output: {
        path: BUILD_PATH,
        filename: 'dll.[name].[hash].js',
        library: '[name]'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']
            },{
                test: /\.less$/,
                use:['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.hbs/,
                loader: "handlebars-template-loader"
            }
        ]
    },
    node: {
        //解决以下错误:
        //ERROR in ./~/handlebars/lib/index.js
        //Module not found: Error: Can't resolve 'fs' in '/home/jjq/git/js/atomer-browser-app/node_modules/handlebars/lib'
        fs: "empty"
    },
    resolve: {
        //解决以下警告:
        //WARNING in ./~/handlebars/lib/index.js
        //require.extensions is not supported by webpack. Use a loader instead.
        alias: {
                'handlebars': 'handlebars/runtime.js'
            }
    },
    resolveLoader: {
        alias: {
            'hbs': 'handlebars-loader'
        },
        modules:["node_modules",path.resolve(__dirname, "lib")]
    },
    devtool: sourceMapType,
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                NODE_ENV : JSON.stringify(NODE_ENV),
                BABEL_ENV : JSON.stringify(NODE_ENV)
            }
        }),
        new webpack.DllPlugin({
            path: path.resolve(BUILD_PATH + '/dll-manifest.json'),
            name: '[name]',
            context: __dirname
        }),
        new AssetsPlugin({ //生成bundleinfo.json，用于向index.hbs中注入
            prettyPrint: true,
            filename: '/dll-bundle-info.json',
            path: BUILD_PATH
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: sourceMapType && (sourceMapType.indexOf("sourcemap") >= 0 || sourceMapType.indexOf("source-map") >= 0),
            compress: {
                warnings: false
            },
            mangle: {
                except: ['exports', 'require']
            }
        })
    ]
};