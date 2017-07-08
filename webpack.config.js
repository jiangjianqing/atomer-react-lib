/**
 * Created by jjq on 5/22/17.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

var pkg = require("./package.json");

var BUILD_OUTPUT = path.resolve(pkg.output ? pkg.output : './build');

var SOURCE_PATH = path.resolve(pkg.sourcePath ? pkg.sourcePath : './src');

//dllBundleInfo是在webpack.dll中生成，记录了所有bundle的文件信息，用于向index.hbs中注入
var dllBundleInfo = require(BUILD_OUTPUT + "/dll-bundle-info.json");

var __DEV__ = !(process.env.NODE_ENV === 'production');

/*
 开发环境推荐：
 cheap-module-eval-source-map
 生产环境推荐：
 cheap-module-source-map
 这也是下版本 webpack 使用 -d 命令启动 debug 模式时的默认选项
 */
var sourceMapType = __DEV__ ? 'cheap-module-eval-source-map' : "cheap-module-source-map";

var BUILD_PATH = __DEV__ ? path.resolve(BUILD_OUTPUT + '/dev') : path.resolve(BUILD_OUTPUT + '/release');

module.exports = {
    //2、进出口文件配置
    //entry:__dirname+'/lib/entry.js',//指定的入口文件
    entry: {
        //app: [/*'babel-polyfill',*/path.join(__dirname, "/lib/entry.js")],
        app: [
            /*'babel-polyfill',*/path.join(SOURCE_PATH, "/main.js")]
        //, vendor: [
            //'vue'
            /*
            'backbone',
            'handlebars'*/
        //]
    },
    output: {//输出
        //20170523:publicPath的设置对webpack-dev-server的设置有影响,暂时关闭
        publicPath: "/assets/",    //publicPath对HtmlWebpackPlugin有影响
        path: BUILD_PATH,//输出路径
        //filename: 'webpack-bundle.js'//输出文件名
        filename: '[name].js',  //这里的name指的是entry中的app
        //chunkFilename: "[id].bundle.js",
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    // 表示这个依赖项是外部lib，遇到require它不需要编译，
    // 且在浏览器端对应window.React
    externals: {
        'jquery' : 'window.jQuery',
        'router' : 'window.Router'
    },
    module: {//在配置文件里添加加载器说明，指明每种文件需要什么加载器处理
        rules: [
            { test: /\.hbs$/, use: "handlebars-loader" },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {//20170522:经测试，多个同样的测试放在一起最ok
                test: /\.jsx?$/,
                exclude:/node_modules/,
                use : [ //多个loader一起使用
                    {//es2015处理
                        loader : 'babel-loader'
                    },
				  	{
					  loader : 'string-replace-loader',
					  options: {
						multiple: [
						    //{ search: 'NODE_ENV', replace: JSON.stringify(process.env.NODE_ENV || 'development') }
							//通过字符串替换来将环境参数传入代码中（仅限browser代码，node下运行的代码其实不需要这一步处理，可以直接访问process）
						  { search: 'process.env.NODE_ENV', replace: JSON.stringify(process.env.NODE_ENV || 'development') }
						]
					  }
				  	}
                    //重要：结合使用webpack和browserify的transform，但最好不要使用browserify的transform
                    //"transform-loader?brfs",  //20170601  加入react jsx  处理后，出现SyntaxError: Unexpected token (5:16)
                    //"transform-loader?browserify-shim"
                ]
            },
             //20170522 暂时都放在上面同一个loader中测试一下是否可行

            {//3、CSS-loader
                test:/\.css$/,
                use : ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                    //{loader : "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            //启用css module，在每个模块中单独加载自己需要使用的类，见http://www.ruanyifeng.com/blog/2016/06/css_modules.html
                            //要么全局css，要么模块css，只能二选一
                            //modules : true,
                            localIdentName : "[path][name]---[local]---[hash:base64:5]", //modules = true 时才生效,设定名称规则
                            importLoaders: 1
                        }
                    },
                    {
                        loader : 'postcss-loader',
                        options: {
                            config: {
                                ctx: {
                                    cssnano: !__DEV__
                                }
                            }
                        }
                    }
                ]})
                //loader:'style-loader!css-loader'//deprecated,感叹号的作用在于使同一文件能够使用不同类型的loader
            },

            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },

            {
                test: /\.(png|jpg|gif)$/,
                exclude: /^node_modules$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        name: 'images/[hash:8].[name].[ext]',
                        limit: '8192'
                    }
                }]
            }

        ]
    },
    //4、服务器依赖包配置
    //https://webpack.js.org/configuration/dev-server/#devserver
    devServer: {//注意：网上很多都有colors属性，但是实际上的webpack2.x已经不支持该属性了
        port:9191,
        contentBase : [//本地服务器所加载的页面所在的目录
            //path.join(__dirname, "./app"),
            //path.join(__dirname, "."), //2017.05.22 保持webpack和webstorm调试index一致的设置项：使都能访问dist目录
            BUILD_PATH,
            path.resolve(BUILD_OUTPUT),
            path.resolve(__dirname), //将当前目录放进去就可以直接访问
            path.join(__dirname, "assets")
        ],
        //20170523:打开hot后会导致浏览器上看不到任何内容，但加载却没问题
        //hot : true,

        historyApiFallback: true,//spa使用html5的route mode , 不跳转
        inline: true,//实时刷新

        //hot：true,//不要书写该属性，否则浏览器无法自动更新
        //publicPath："/asses/",//设置该属性后，webpack-dev-server会相对于该路径

        //Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors
        overlay: {
            warnings: true,
            errors: true
        }
    },

    plugins:[
        new ExtractTextPlugin("[name].css?[contenthash]"),
        /*
        //CommonsChunkPlugin与dll一样可以实现类似的公共库分离效果，但dll可以前置编译，更好用
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),*/
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(BUILD_OUTPUT + '/dll-manifest.json')//此处路径为上面webpack.config.dll.js中DllPlugin插件中的path
        }),
        new HtmlWebpackPlugin({
            //favicon:'./src/images/icon_logo.png', //favicon路径
            filename: 'index.html', //生成的html存放路径，相对于 path
            template: path.join(SOURCE_PATH , '/template/index.hbs'), //html模板路径
            dllBundleInfo: dllBundleInfo, //向index.hbs中注入bundle文件
            inject: true,
            hash: true,
            minify: __DEV__ ? false : {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        })

    ],//插件

    resolve: {
        alias: {
            //'service-manager' : path.resolve('./lib/services/service-manager.js'), //20170612 deprecated
            'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.common.js') //从node_modules目录加载，加上这个配置后文件尺寸变大好几倍，考虑到不设置也能用，所以暂时关闭
            //'components': path.resolve(__dirname, '../src/components'),
            //'easyui':  path.resolve('./public/easyui') //重要： 如果要引用本地第三方库，在这里添加
        },
        //modulesDirectories: ['web_modules', 'node_modules', 'node_modules/VueFrame'],
        extensions: ['.js', '.jsx', '.css'] //后缀名自动补全
    },

    //使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。
    //这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。
    // 不过在开发阶段这是一个非常好的选项.
    //https://webpack.github.io/docs/configuration.html#devtool
    devtool: sourceMapType
};

//如果是产品模式则设定一些
if (!__DEV__) {
    //在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                BABEL_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: sourceMapType && (sourceMapType.indexOf("sourcemap") >= 0 || sourceMapType.indexOf("source-map") >= 0)
        })
        //new ExtractTextPlugin("[name]-[hash].css")
    ]);
}