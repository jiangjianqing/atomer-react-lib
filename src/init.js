/**
 * Created by cz_jjq on 17-6-10.
 */
let debug = require('debug');
const log = debug('app:log');

let EnvIniter = require('atomer-common-lib').EnvIniter;

let initer = new EnvIniter();

initer.configureProduction(function(){
  debug.disable();
});

initer.configureDevelopment(function(){
	// Enable the logger.指定范围的才有效，否则可能会引入无关的debug输出
  debug.enable('app:*,component:*');
  log('init : 当前处于生产环境,Logging is enabled!');
});

//browserify 还没找到合适的replace插件
initer.init(process.env.NODE_ENV);