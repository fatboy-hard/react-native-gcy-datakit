"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTrace = exports.startLogger = exports.startRum = exports.init = exports.initFTSDK = exports.onPause = exports.onResume = exports.logout = exports.bindUser = void 0;
const react_native_1 = require("react-native");
const { RNYuque } = react_native_1.NativeModules;
/**
 * 绑定用户方法
 * @param ID 用户ID
 */
function bindUser(ID) {
    RNYuque.bindUser(ID);
}
exports.bindUser = bindUser;
/**
 * 退出登录时候使用
 */
function logout() {
    RNYuque.logout();
}
exports.logout = logout;
/**
 *
 * @param pageName 页面名称
 * @param referrer 父级页面名称
 */
function onResume(pageName, referrer) {
    RNYuque.onResume(pageName, referrer);
}
exports.onResume = onResume;
/**
 * 暂停追踪页面数据
 */
function onPause() {
    RNYuque.onPause();
}
exports.onPause = onPause;
/**
 *
 * @param url : Datakit 安装地址
 * @param appid 应用地址
 * @param trackId : // 添加标签数据，用于用户监测数据源区分，如果需要使用追踪功能，则参数 key 为 track_id ,value 为任意数值
 * @param isDebug : 是否为debug
 */
function initFTSDK(url, appid, trackValue = "", isDebug = true, env = 3) {
    RNYuque.initFTSDK(url, appid, trackValue, isDebug, env);
}
exports.initFTSDK = initFTSDK;
/**
 * SDK配置与调用
 *
 * @param metricsUrl 数据上报地址
 * @param env        默认 EnvType.PROD ,PROD :0 线上环境 ,GRAY :1灰度环境 ,PRE :2预发布环境 ,COMMON: 3日常环境 ,LOCAL: 4本地环境
 * @param isDebug    ///在debug环境下,设置为YES
*/
function init(metricsUrl, env = 3, isDebug = true) {
    RNYuque.init(metricsUrl, env, isDebug);
}
exports.init = init;
/**
 * 开启rum
 *
 * @param appid    开发平台获取,指定才能 启动
 * @param isANR    设置是否需要采集卡顿无响应事件
 * @param isCrash  设置是否需要采集奔溃日志
 * @param isFreeze 设置是否需要采集卡顿
 * @param isAction 设置是否追踪用户操作
 */
function startRum(appid, isANR = true, isCrash = true, isFreeze = true, isAction = true) {
    RNYuque.startRum(appid, isANR, isCrash, isFreeze, isAction);
}
exports.startRum = startRum;
/**
 * Log 配置
 *
 * @param isCustom  是否允许上传自定义 log
 * @param isRum     是否将 logger 数据与 rum 关联
 * @param isConsole 是否允许上传自定义 log
 */
function startLogger(isCustom = true, isRum = true, isConsole = true) {
    RNYuque.startLogger(isCustom, isRum, isConsole);
}
exports.startLogger = startLogger;
/**
* Trace配置
*
* @param type  默认为 DDTrace，目前支持 Zipkin :1, Jaeger:2, DDTrace :0
* @param isRum 是否将 Trace 数据与 rum 关联
*/
function startTrace(type = 2, isRum = true) {
    RNYuque.startTrace(type, isRum);
}
exports.startTrace = startTrace;
