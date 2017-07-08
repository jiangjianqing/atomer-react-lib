/**
 * Created by jjq on 5/23/17.
 */

//require('./init');  //标准初始化过程
//require('./styles/login-form.css');   //全局css标准写法：引入css



//20170525 重要: page和director都是路由组件,page的介绍中可以学到一些route知识,director可以动态定义路由(Adhoc Routing 和 Scoped Routing)，各有优缺点
//20170525 :经过测试 ,director 1.2.6在使用时不会拦截页面向服务器请求数据，暂时还是用page
//When developing large client-side or server-side applications it is not always possible to define routes in one location.
// Usually individual decoupled components register their own routes with the application router.
// We refer to this as Adhoc Routing

let Router = require('router'); //director router的导入方式

//let routes = require('./routes');

//require('./config-route');
let routes = {
    "/" : ()=>require("./scripts/app")
};


let router = new Router();
//require('easyui/jquery.easyui.min.js');
//20170524:由于 easyui的使用模式(修改html模板)与组件框架冲突，所以用bootstrap代替

Object.keys(routes).forEach(route => {
    //const Component = require('./pages/' + routes[route] + '.vue');
    //let cb = () => app.ViewComponent = Component;
    let cb = routes[route];
    router.on(route, cb);
});


let notFuncCall = function(){
    log("404 not found");
};
router.configure({
    html5history : true,
    notfound : notFuncCall //not found
});

router.init(); //20170525 director的路由会重新向服务器请求数据，page则不会，但director用来做多页很好

//使用browserify是router

/*
 // browserify vue test section 20170601
 const app = new Vue({
 //router : router,
 el: '#app',

 render: function (h) {
 //20170601晚上,引用vue文件，会出现[Vue warn]: Failed to mount component: template or render function not defined
 //极有可能是vueify的锅
 //return h(require('./components/common/toolbar.vue'));
 return h('h1', 'hello world');
 }
 });
 */
